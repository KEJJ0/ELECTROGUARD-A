export function Badge({ className = '', ...props }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-200 ${className}`}
      {...props}
    />
  );
}
