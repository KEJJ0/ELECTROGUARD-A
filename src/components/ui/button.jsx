// src/Components/ui/button.jsx
import React from "react";

export function Button({ variant = "primary", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors " +
    "focus:outline-none focus:ring-2 focus:ring-slate-400/40 disabled:opacity-50 disabled:pointer-events-none";
  const size = "h-9 px-3 text-sm";
  const variants = {
    primary:  "bg-cyan-600 text-white hover:bg-cyan-500",
    secondary:"bg-slate-800 text-slate-100 hover:bg-slate-700",
    outline:  "border border-slate-700 text-slate-100 hover:bg-slate-800",
    ghost:    "text-slate-300 hover:bg-slate-800",
  };
  return <button className={`${base} ${size} ${variants[variant] ?? variants.primary} ${className}`} {...props} />;
}
