import { useState } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { parseTaskFromText } from "../../utils/nlp";

export default function ScopeSection({ tasks, setTasks, theme }) {
  const [nl, setNl] = useState("");
  const [voicePending, setVoicePending] = useState([]);

  function markEdited(t, key) { return { ...(t || {}), editedFields: { ...(t?.editedFields || {}), [key]: true } }; }
  function updateTaskName(id, name){ setTasks(prev => prev.map(t => t.id===id ? { ...t, name } : t)); }

  function addFromNL() {
    if (!nl.trim()) return;
    const parsed = parseTaskFromText(nl);
    const t = { ...parsed, provenance: { source: "typed" } };
    setTasks((prev) => [...prev, t]);
    setNl("");
  }

  function addVoiceChip() {
    const sample = ["deck 10x6 @450", "balustrade 8m", "posts qty 6 x 2.4"][Math.floor(Math.random() * 3)];
    setVoicePending((prev) => [...prev, sample]);
  }

  function confirmVoice(text) {
    const voiceTask = parseTaskFromText(text);
    setTasks((prev) => {
      const idx = prev.findIndex((p) => p.type === voiceTask.type && (p.name || '').toLowerCase() === (voiceTask.name || '').toLowerCase());
      if (idx === -1) return [...prev, voiceTask];
      const current = { ...prev[idx] }; current.suggested = { ...(current.suggested || {}) };
      for (const [k, v] of Object.entries(voiceTask.attrs || {})) {
        const manuallyEdited = !!current.editedFields?.[k];
        if (manuallyEdited && current.attrs?.[k] !== v) current.suggested[k] = v; else current.attrs = { ...(current.attrs || {}), [k]: v };
      }
      const next = [...prev]; next[idx] = current; return next;
    });
    setVoicePending((prev) => prev.filter((v) => v !== text));
  }

  function updateAttr(id, key, value) {
    setTasks((prev) => prev.map((t) => { if (t.id !== id) return t; const edited = markEdited(t, key); return { ...edited, attrs: { ...(edited.attrs || {}), [key]: value } }; }));
  }

  function resolveConflict(id, key, takeSuggested) {
    setTasks((prev) => prev.map((t) => {
      if (t.id !== id) return t;
      const suggestedVal = t.suggested?.[key];
      const cur = { ...t };
      if (takeSuggested) cur.attrs = { ...(cur.attrs || {}), [key]: suggestedVal };
      cur.suggested = { ...(cur.suggested || {}) };
      delete cur.suggested[key];
      return cur;
    }));
  }

  function removeTask(id) { setTasks((prev) => prev.filter((t) => t.id !== id)); }

  function changeType(id, newType) {
    setTasks((prev) => prev.map((t) => {
      if (t.id !== id) return t;
      let attrs = {};
      if (newType === "area") attrs = { length_m: t.attrs?.length_m || "", width_m: t.attrs?.width_m || "", centres_mm: t.attrs?.centres_mm || "" };
      if (newType === "linear") attrs = { length_m: t.attrs?.length_m || "", spacing_mm: t.attrs?.spacing_mm || "" };
      if (newType === "count") attrs = { qty: t.attrs?.qty || "", length_m: t.attrs?.length_m || "" };
      if (newType === "custom") attrs = { note: t.attrs?.note || "" };
      return { ...t, type: newType, attrs };
    }));
  }

  const TypePills = ({ t }) => (
    <div className="flex gap-2 text-xs mt-2">
      {["area", "linear", "count", "custom"].map((tp) => (
        <button
          key={tp}
          className={`px-2 py-1 rounded-full border ${t.type === tp ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-700"}`}
          onClick={() => changeType(t.id, tp)}
        >
          {tp}
        </button>
      ))}
    </div>
  );

  const MissingPrompts = ({ t }) => {
    const chips = [];
    if (t.type === "area" && !t.attrs?.centres_mm) { chips.push({ k: "centres_mm", v: 450 }, { k: "centres_mm", v: 600 }); }
    if (t.type === "linear" && !t.attrs?.spacing_mm) { chips.push({ k: "spacing_mm", v: 100 }, { k: "spacing_mm", v: 90 }); }
    return chips.length ? (
      <div className="mt-2 text-xs opacity-90">
        <div className="mb-1">Missing details:</div>
        <div className="flex gap-2 flex-wrap">
          {chips.map((c) => (
            <button key={c.k + String(c.v)} className="px-2 py-1 rounded-full border" onClick={() => updateAttr(t.id, c.k, c.v)}>
              {c.k.replace("_", " ")} → {c.v}
            </button>
          ))}
        </div>
      </div>
    ) : null;
  };

  const ConflictBar = ({ t }) => {
    const keys = Object.keys(t.suggested || {});
    if (!keys.length) return null;
    return (
      <div className="mt-2 text-xs bg-amber-50 border border-amber-200 rounded-xl p-2">
        {keys.map((k) => (
          <div key={k} className="flex items-center gap-2 py-1 flex-wrap">
            <div className="font-medium">Voice suggests {k.replace("_", " ")} = {String(t.suggested[k])}</div>
            <div className="opacity-80">(current {String(t.attrs?.[k] ?? "")})</div>
            <button className="px-2 py-1 rounded border" onClick={() => resolveConflict(t.id, k, false)}>Keep current</button>
            <button className="px-2 py-1 rounded border" onClick={() => resolveConflict(t.id, k, true)}>Use suggestion</button>
          </div>
        ))}
      </div>
    );
  };

  const iptBorder = theme === "jobsite" ? "border-neutral-600" : "border-slate-300";
  const iptBG = theme === "jobsite" ? "bg-neutral-800 text-neutral-100 placeholder-neutral-400" : "bg-white text-slate-900 placeholder-slate-400";

  return (
    <div className="space-y-3">
      <Card theme={theme}>
        <div className="flex gap-2">
          <input
            value={nl}
            onChange={(e) => setNl(e.target.value)}
            placeholder="Add a task… e.g. deck 10x6 @450"
            className={`flex-1 rounded-xl border px-3 py-2 ${iptBorder} ${iptBG}`}
          />
        </div>
        <div className="mt-2 flex gap-2">
          <button className="rounded-xl border px-3 py-2" onClick={addFromNL}>Add</button>
          <button className="rounded-xl border px-3 py-2" onClick={addVoiceChip}>🎙️ Voice</button>
        </div>

        {voicePending.length > 0 && (
          <div className="mt-3 text-sm">
            <div className="opacity-80 mb-1">Pending voice tasks (tap to confirm):</div>
            <div className="flex flex-wrap gap-2">
              {voicePending.map((v) => (
                <button key={v} className="px-2 py-1 rounded-full border" onClick={() => confirmVoice(v)}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>

      {tasks.length === 0 && (
        <Card theme={theme}>
          <div className="text-sm opacity-80">No tasks yet. Add one with NL or voice.</div>
        </Card>
      )}

      <div className="space-y-2">
        {tasks.map((t) => (
          <Card key={t.id} theme={theme}>
            <div className="flex items-center justify-between">
              <div className="font-medium flex-1">
                <input
                  value={t.name}
                  onChange={(e)=>updateTaskName(t.id, e.target.value)}
                  className={`font-medium bg-transparent border-b border-dashed focus:outline-none focus:border-blue-500 ${theme === "jobsite" ? "border-neutral-600" : "border-slate-300"}`}
                />
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full border ${t.confirmed ? "bg-green-50 border-green-300 text-green-700" : "bg-slate-50"}`}>
                  {t.confirmed ? "OK" : "Pending"}
                </span>
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full border opacity-80">
                  {t.provenance?.source === "voice" ? "voice" : "typed"}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="text-sm rounded border px-2 py-1" onClick={() => removeTask(t.id)}>Remove</button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-3 mt-2">
              {t.type === "area" && (
                <>
                  <Input label="Length (m)" value={String(t.attrs.length_m || "")} onChange={(v) => updateAttr(t.id, "length_m", Number(v) || 0)} voiceCaptured={t.provenance?.source === "voice"} theme={theme} />
                  <Input label="Width (m)" value={String(t.attrs.width_m || "")} onChange={(v) => updateAttr(t.id, "width_m", Number(v) || 0)} voiceCaptured={t.provenance?.source === "voice"} theme={theme} />
                  <Input label="Centres (mm)" value={String(t.attrs.centres_mm || "")} onChange={(v) => updateAttr(t.id, "centres_mm", Number(v) || 0)} voiceCaptured={t.provenance?.source === "voice"} theme={theme} />
                </>
              )}

              {t.type === "linear" && (
                <>
                  <Input label="Length (m)" value={String(t.attrs.length_m || "")} onChange={(v) => updateAttr(t.id, "length_m", Number(v) || 0)} voiceCaptured={t.provenance?.source === "voice"} theme={theme} />
                  <Input label="Spacing (mm)" value={String(t.attrs.spacing_mm || "")} onChange={(v) => updateAttr(t.id, "spacing_mm", Number(v) || 0)} voiceCaptured={t.provenance?.source === "voice"} theme={theme} />
                </>
              )}

              {t.type === "count" && (
                <>
                  <Input label="Qty" value={String(t.attrs.qty || "")} onChange={(v) => updateAttr(t.id, "qty", Number(v) || 0)} voiceCaptured={t.provenance?.source === "voice"} theme={theme} />
                  <Input label="Length (m)" value={String(t.attrs.length_m || "")} onChange={(v) => updateAttr(t.id, "length_m", Number(v) || 0)} voiceCaptured={t.provenance?.source === "voice"} theme={theme} />
                </>
              )}

              {t.type === "custom" && (
                <Input label="Notes" value={String(t.attrs.note || "")} onChange={(v) => updateAttr(t.id, "note", v)} voiceCaptured={t.provenance?.source === "voice"} theme={theme} />
              )}
            </div>

            <TypePills t={t} />
            <MissingPrompts t={t} />
            <ConflictBar t={t} />
          </Card>
        ))}
      </div>
    </div>
  );
}
