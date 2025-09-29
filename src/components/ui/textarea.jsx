// src/Components/ui/textarea.jsx
export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={
        "min-h-[100px] w-full rounded-lg border border-slate-700 " +
        "bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-400 " +
        "focus:outline-none focus:ring-2 focus:ring-emerald-500 " +
        className
      }
      {...props}
    />
  );
}
