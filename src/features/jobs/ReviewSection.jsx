import Card from "../../components/ui/Card";

export default function ReviewSection({ details, tasks, theme }) {
  return (
    <Card theme={theme}>
      <div className="font-medium mb-2">Review</div>
      <div className="space-y-2 text-sm">
        <div className="opacity-80">Client: <b>{details.clientName || "—"}</b></div>
        <div className="opacity-80">Address: <b>{details.address || "—"}</b></div>
        <div className="opacity-80">Phone: <b>{details.phone || "—"}</b></div>
        <div className="opacity-80">Title: <b>{details.jobTitle || "—"}</b></div>

        <div className="pt-2">Summary of inclusions ({tasks.length}):</div>
        <ul className="list-disc pl-5 opacity-90">
          {tasks.map((t) => (
            <li key={t.id}>{t.name} — {t.type}</li>
          ))}
        </ul>

        <div className="pt-2">Prompt: Have you added allowance for poor access?</div>
        <div>Prompt: Did you include waste%?</div>
      </div>
    </Card>
  );
}
