import React, {createContext, useContext, useState} from "react";

const TabsCtx = createContext({value: "", setValue: () => {}});
export function Tabs({defaultValue, value, onValueChange, className="", children}) {
  const [inner, setInner] = useState(defaultValue ?? "");
  const v = value ?? inner;
  const setV = onValueChange ?? setInner;
  return (
    <TabsCtx.Provider value={{value: v, setValue: setV}}>
      <div className={className}>{children}</div>
    </TabsCtx.Provider>
  );
}
export function TabsList({className="", ...p}) {
  return <div className={`flex gap-2 border-b border-slate-800 ${className}`} {...p} />;
}
export function TabsTrigger({value, className="", children, ...p}) {
  const {value: v, setValue} = useContext(TabsCtx);
  const active = v === value;
  return (
    <button
      onClick={() => setValue(value)}
      className={`px-3 py-1.5 text-sm rounded-t-md 
        ${active ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800/60"} ${className}`}
      {...p}
    >
      {children}
    </button>
  );
}
export function TabsContent({value, className="", children, ...p}) {
  const {value: v} = useContext(TabsCtx);
  if (v !== value) return null;
  return <div className={`py-3 ${className}`} {...p}>{children}</div>;
}
// بعض الأكواد تكتبها مفردة:
export const TabContent = TabsContent;
