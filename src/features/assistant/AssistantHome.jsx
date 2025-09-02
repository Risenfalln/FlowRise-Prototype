import Card from "../../components/ui/Card";

export default function AssistantHome({ onOpen, theme }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <h2 className="text-xl font-semibold">Assistant</h2>
      <Card theme={theme}>
        <div className="text-sm opacity-80">Try: "Add a task: deck 10x6 merbau"</div>
        <div className="mt-2">
          <button className="rounded-lg border px-3 py-2" onClick={onOpen}>Open Assistant Panel</button>
        </div>
      </Card>
    </div>
  );
}
