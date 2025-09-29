import React, { useEffect, useRef, useState } from "react";

export function Popover({ children }) {
  return <div className="relative inline-block">{children}</div>;
}

export function PopoverTrigger({ className = "", children, ...props }) {
  // مجرد wrapper عشان نفس الـ API
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

export function PopoverContent({ className = "", align = "start", children, ...props }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  // نفتحه إذا الزر السابق له انضغط
  useEffect(() => {
    const trigger = ref.current?.previousElementSibling;
    if (!trigger) return;
    const onClick = () => setOpen((o) => !o);
    trigger.addEventListener("click", onClick);
    return () => trigger.removeEventListener("click", onClick);
  }, []);

  // إغلاق عند الضغط خارج أو Esc
  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!open) return null;

  const alignClass =
    align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0";

  return (
    <div
      ref={ref}
      className={`absolute z-50 mt-2 min-w-[12rem] rounded-xl border border-slate-700 bg-slate-900 p-3 shadow ${alignClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
