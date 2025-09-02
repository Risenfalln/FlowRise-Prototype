import Card from "../../components/ui/Card";

export default function JobsList({ jobs, onOpenJob, theme }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <h2 className="text-xl font-semibold">Jobs</h2>
      {jobs.map((j) => (
        <Card key={j.id} theme={theme}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{j.title}</div>
              <div className="text-sm opacity-70">{j.status}</div>
            </div>
            <button className="text-blue-500 text-sm" onClick={() => onOpenJob(j)}>
              Open
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
