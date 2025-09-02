export default function Tabs4({ active, setActive, onNext, theme }) {
  const isDark = theme === "jobsite";
  return (
    <div className="flex items-center justify-between gap-2 text-sm">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {["Details", "Scope", "Review", "Finalise"].map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={`px-3 py-1 rounded-full border ${
              active === s
                ? "bg-blue-600 text-white border-blue-600"
                : isDark ? "border-neutral-600" : "border-slate-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <button
        className={`shrink-0 rounded-full border px-3 py-1.5 hover:opacity-90 ${isDark ? "border-neutral-600" : "border-slate-300"}`}
        onClick={onNext}
      >
        Next →
      </button>
    </div>
  );
}
