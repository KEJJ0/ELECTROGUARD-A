/* بديل بسيط لـ shadcn/ui */
export function Card({ className = '', ...props }) {
  return <div className={`rounded-xl border border-slate-800 bg-slate-900/40 shadow ${className}`} {...props} />;
}
export function CardHeader({ className = '', ...props }) {
  return <div className={`p-4 border-b border-slate-800 ${className}`} {...props} />;
}
export function CardTitle({ className = '', ...props }) {
  return <h3 className={`text-lg font-semibold ${className}`} {...props} />;
}
export function CardContent({ className = '', ...props }) {
  return <div className={`p-4 ${className}`} {...props} />;
}
