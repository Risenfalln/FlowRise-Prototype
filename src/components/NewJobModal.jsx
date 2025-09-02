import { useState } from "react";

export default function NewJobModal({ onClose, onCreate, theme }) {
  const [title, setTitle] = useState("");
  const panelBG = theme === "jobsite" ? "bg-neutral-900" : "bg-white";
  const border = theme === "jobsite" ? "border-neutral-600" : "border-slate-300";
  const inputBG = theme === "jobsite" ? "bg-neutral-800 text-neutral-100 placeholder-neutral-400" : "bg-white text-slate-900 placeholder-slate-400";

  function create() {
    if (!title.trim()) return;
    onCreate({ title });
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl ${panelBG} rounded-2xl shadow-2xl p-4`}>
        <div className="flex items-center justify-between border-b pb-2">
          <div className="font-semibold">New Job</div>
          <button onClick={onClose} className="opacity-80">✕</button>
        </div>
        <div className="py-4 space-y-4">
          <label className="text-sm">
            <div className="mb-1 opacity-80">Job title</div>
            <input
              className={`w-full rounded-xl border px-3 py-2 ${border} ${inputBG}`}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="e.g., Deck + Balustrade"
            />
          </label>
          <div className="flex justify-end gap-2">
            <button className={`rounded-lg border px-3 py-2 ${border}`} onClick={create}>Create job</button>
          </div>
        </div>
      </div>
    </div>
  );
}
