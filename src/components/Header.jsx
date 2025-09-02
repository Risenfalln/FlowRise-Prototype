import Logo from "./ui/Logo";

export default function Header({ onOpenAssistant, theme, setTheme }) {
  const isDark = theme === "jobsite";
  const bg = isDark ? "bg-neutral-900/80 border-neutral-700" : "bg-white/90 border-slate-200";
  const btn = isDark ? "bg-neutral-800 hover:bg-neutral-700 text-neutral-100" : "bg-slate-100 hover:bg-slate-200";
  return (
    <header className={`sticky top-0 z-10 backdrop-blur border-b ${bg} h-14`}>
      <div className="mx-auto max-w-3xl px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <div className="font-semibold">FlowRise</div>
        </div>
        <div className="flex items-center gap-2">
          <button className={`rounded-md px-3 py-2 text-sm ${btn}`} onClick={onOpenAssistant}>
            Ask
          </button>
          <button
            className={`rounded-md px-3 py-2 text-sm border ${isDark ? "border-neutral-600 hover:bg-neutral-800" : "border-slate-300 hover:bg-slate-100"}`}
            onClick={() => setTheme(isDark ? "light" : "jobsite")}
            aria-label="Toggle theme"
          >
            {isDark ? "☀️ Light" : "🛠️ Jobsite"}
          </button>
        </div>
      </div>
    </header>
  );
}
