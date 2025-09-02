export default function AssistantPanel({ onClose, context, theme }) {
  const panelBG = theme === "jobsite" ? "bg-neutral-900" : "bg-white";
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md ${panelBG} shadow-2xl p-4 flex flex-col`}>
        <div className="flex items-center justify-between border-b pb-2">
          <div className="font-semibold">Assistant</div>
          <button onClick={onClose} className="opacity-80">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto py-3 text-sm">
          {context ? (
            <div className="opacity-80">Context: <b>{context.title}</b></div>
          ) : (
            <div className="opacity-80">No job open.</div>
          )}
        </div>
      </div>
    </div>
  );
}
