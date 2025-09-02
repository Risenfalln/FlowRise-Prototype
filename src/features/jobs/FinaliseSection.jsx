import Card from "../../components/ui/Card";

export default function FinaliseSection({ theme }) {
  return (
    <Card theme={theme}>
      <div className="font-medium mb-2">Finalise</div>
      <div className="space-y-2 text-sm">
        <div>Preview: Cut list</div>
        <div>Preview: Order list</div>
        <div>Preview: Client quote</div>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button className="rounded-lg border px-3 py-2">Export BOM (CSV)</button>
        <button className="rounded-lg border px-3 py-2">Generate Client PDF</button>
      </div>
    </Card>
  );
}
