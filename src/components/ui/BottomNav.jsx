export default function BottomNav({ tab, setTab, theme }) {
  const isDark = theme === "jobsite";
  const bg = isDark ? "bg-neutral-900 border-neutral-700" : "bg-white border-slate-200";
  const items = [
    { id: "today", label: "Today", icon: "🏠" },
    { id: "jobs", label: "Jobs", icon: "📋" },
    { id: "assistant", label: "Assistant", icon: "🤖" },
    { id: "library", label: "Library", icon: "📚" },
  ];
  return (
    <nav className={`fixed bottom-0 left-0 right-0 border-t ${bg} h-14 z-20`}>
      <div className="mx-auto max-w-3xl grid grid-cols-4 h-full">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => setTab(it.id)}
            className={`h-full text-sm flex flex-col items-center justify-center ${
              tab === it.id ? (isDark ? "text-blue-300" : "text-blue-600") : (isDark ? "text-neutral-400" : "text-slate-500")
            }`}
          >
            <span aria-hidden>{it.icon}</span>
            {it.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
