export function Progress({ value = 0, className = '', ...props }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className={`h-2 w-full rounded bg-slate-800 ${className}`} {...props}>
      <div className="h-2 rounded bg-emerald-500" style={{ width: `${v}%` }} />
    </div>
  );
}
