import React from "react";
export function Calendar({value, onChange, className="", ...p}) {
  const v = value && typeof value !== "string" ? 
            new Date(value).toISOString().slice(0,10) : value;
  return (
    <input
      type="date"
      value={v}
      onChange={(e)=> onChange?.(e.target.value)}
      className={`h-10 rounded-lg border border-slate-700 bg-slate-900 px-3 text-slate-100 ${className}`}
      {...p}
    />
  );
}
