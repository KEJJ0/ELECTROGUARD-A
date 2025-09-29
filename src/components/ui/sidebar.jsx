// src/Components/ui/sidebar.jsx
import React, { createContext, useContext, useState } from "react";

/* سياق للتحكّم بفتح/إغلاق السايدبار */
const SidebarCtx = createContext({ open: true, toggle: () => {} });
export const useSidebar = () => useContext(SidebarCtx);

export function SidebarProvider({ defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = () => setOpen((o) => !o);
  return (
    <SidebarCtx.Provider value={{ open, toggle }}>
      {children}
    </SidebarCtx.Provider>
  );
}

/* السايدبار نفسه (عرض متغير + بدون flex خارجي يخبّط اللayout) */
export function Sidebar({ className = "", children, ...props }) {
  const { open } = useSidebar();
  return (
    <aside
      className={`shrink-0 transition-all duration-200 overflow-hidden
                  border-r border-slate-800 bg-slate-900
                  ${open ? "w-64 md:w-64" : "w-0 md:w-16"} ${className}`}
      {...props}
    >
      <div className="h-screen flex flex-col">{children}</div>
    </aside>
  );
}

/* محتوى السايدبار قابل للتمرير */
export function SidebarContent({ className = "", children, ...props }) {
  return (
    <div className={`flex-1 overflow-y-auto ${className}`} {...props}>
      {children}
    </div>
  );
}

/* زر الإظهار/الإخفاء */
export function SidebarTrigger({ className = "", children, ...props }) {
  const { toggle } = useSidebar();
  return (
    <button
      type="button"
      onClick={toggle}
      className={`rounded-lg p-2 hover:bg-slate-800 ${className}`}
      {...props}
    >
      {children ?? "☰"}
    </button>
  );
}

/* عناصر المجموعات والقوائم (مطابقة لأسماء الاستيراد في Layout.jsx) */
export function SidebarGroup({ className = "", ...props }) {
  return <div className={className} {...props} />;
}
export function SidebarGroupLabel({ className = "", ...props }) {
  return <div className={className} {...props} />;
}
export function SidebarGroupContent({ className = "", ...props }) {
  return <div className={className} {...props} />;
}
export function SidebarMenu({ className = "", ...props }) {
  return <ul className={className} {...props} />;
}
export function SidebarMenuItem({ className = "", ...props }) {
  return <li className={className} {...props} />;
}
export function SidebarMenuButton({
  className = "",
  asChild = false,
  children,
  ...props
}) {
  const Tag = asChild ? "span" : "button";
  return (
    <Tag className={`w-full text-left ${className}`} {...props}>
      {children}
    </Tag>
  );
}

/* هيدر/فوتر/Inset اختيارية */
export function SidebarHeader({ className = "", ...props }) {
  return <div className={`px-3 py-2 border-b border-slate-800 ${className}`} {...props} />;
}
export function SidebarFooter({ className = "", ...props }) {
  return <div className={`mt-auto px-3 py-2 border-t border-slate-800 ${className}`} {...props} />;
}
export function SidebarInset({ className = "", ...props }) {
  return <div className={className} {...props} />;
}
