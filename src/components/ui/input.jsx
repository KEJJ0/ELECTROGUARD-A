export function Input({ className = "", ...props }) {
  return (
    <input
      className={
        "h-10 w-full rounded-lg border border-slate-700 bg-slate-900 " +
        "px-3 text-slate-100 placeholder-slate-400 focus:outline-none " +
        "focus:ring-2 focus:ring-emerald-500 " + className
      }
      {...props}
    />
  );
}
