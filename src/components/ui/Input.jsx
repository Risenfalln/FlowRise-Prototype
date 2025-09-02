export default function Input({ label, placeholder, value, onChange, voiceCaptured, theme }) {
  const isDark = theme === "jobsite";
  const border = isDark ? "border-neutral-600" : "border-slate-300";
  const bg = isDark ? "bg-neutral-800 text-neutral-100 placeholder-neutral-400" : "bg-white text-slate-900 placeholder-slate-400";
  return (
    <label className="text-sm">
      <div className="flex items-center mb-1">
        <div className="opacity-80">{label}</div>
        {voiceCaptured && <span className="ml-2 text-xs text-blue-400">🎙️</span>}
      </div>
      <input
        value={value !== undefined ? value : ""}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={`w-full rounded-xl border px-3 py-2 ${border} ${bg}`}
      />
    </label>
  );
}
