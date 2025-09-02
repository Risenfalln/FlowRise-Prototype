import { useMemo, useState, useEffect } from "react";
import Card from "../../components/ui/Card";
import Tabs4 from "../../components/ui/Tabs4";
import Input from "../../components/ui/Input";
import { loadJSON, saveJSON } from "../../utils/storage";
import ScopeSection from "./ScopeSection";
import ReviewSection from "./ReviewSection";
import FinaliseSection from "./FinaliseSection";

export default function JobDetail({ job, onBack, theme }) {
  const [active, setActive] = useState("Details");
  const baseKey = useMemo(() => `job:${job.id}`, [job.id]);
  const detailsKey = `${baseKey}:details`;
  const scopeKey = `${baseKey}:scope`;

  const [details, setDetails] = useState(() =>
    loadJSON(detailsKey, { clientName: "", address: "", phone: "", jobTitle: job.title || "" })
  );
  useEffect(() => { saveJSON(detailsKey, details); }, [detailsKey, details]);

  const [tasks, setTasks] = useState(() => loadJSON(scopeKey, []));
  useEffect(() => { saveJSON(scopeKey, tasks); }, [scopeKey, tasks]);

  function goNext() {
    const order = ["Details", "Scope", "Review", "Finalise"];
    const i = order.indexOf(active);
    if (i < order.length - 1) setActive(order[i + 1]);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <button className="text-sm opacity-80" onClick={onBack}>
        ← Back to Jobs
      </button>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{job.title}</h2>
        <div className="text-xs px-2 py-1 rounded-full border opacity-80">{job.status}</div>
      </div>

      <Tabs4 active={active} setActive={setActive} onNext={goNext} theme={theme} />

      {active === "Details" && (
        <Card theme={theme}>
          <div className="font-medium mb-2">Details</div>
          <div className="grid md:grid-cols-2 gap-3">
            <Input label="Client name" value={details.clientName} onChange={(v)=>setDetails(d=>({...d, clientName:v}))} placeholder="Jane Jones" theme={theme} />
            <Input label="Address" value={details.address} onChange={(v)=>setDetails(d=>({...d, address:v}))} placeholder="123 Example St, Altona" theme={theme} />
            <Input label="Phone" value={details.phone} onChange={(v)=>setDetails(d=>({...d, phone:v}))} placeholder="0412 345 678" theme={theme} />
            <Input label="Job title" value={details.jobTitle} onChange={(v)=>setDetails(d=>({...d, jobTitle:v}))} placeholder="Deck + Balustrade" theme={theme} />
          </div>
        </Card>
      )}

      {active === "Scope" && <ScopeSection tasks={tasks} setTasks={setTasks} theme={theme} />}

      {active === "Review" && <ReviewSection details={details} tasks={tasks} theme={theme} />}

      {active === "Finalise" && <FinaliseSection theme={theme} />}
    </div>
  );
}
