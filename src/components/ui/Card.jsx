export default function Card({ children, theme }) {
  const isDark = theme === "jobsite";
  const cls = isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-slate-200";
  return <div className={`border rounded-2xl p-3 shadow-sm ${cls}`}>{children}</div>;
}
