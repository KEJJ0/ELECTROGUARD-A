import React, {createContext, useContext, useEffect, useState} from "react";

const SelCtx = createContext({
  open:false, setOpen:()=>{},
  value:"", setValue:()=>{},
  items:[], register:()=>{}
});

export function Select({defaultValue="", value, onValueChange, children}) {
  const [inner, setInner] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const v = value ?? inner;
  const setV = onValueChange ?? setInner;
  const register = (val, label) =>
    setItems(prev => prev.find(i=>i.value===val) ? prev : [...prev, {value:val, label}]);
  return (
    <SelCtx.Provider value={{open,setOpen,value:v,setValue:setV,items,register}}>
      <div className="relative inline-block">{children}</div>
    </SelCtx.Provider>
  );
}

export function SelectTrigger({className="", children, ...p}) {
  const {open,setOpen,value,items} = useContext(SelCtx);
  const label = items.find(i=>i.value===value)?.label ?? value ?? "Select…";
  return (
    <button onClick={()=>setOpen(!open)}
      className={`h-10 min-w-[10rem] rounded-lg border border-slate-700 bg-slate-900 px-3 text-left ${className}`} {...p}>
      {children ?? label}
    </button>
  );
}

export function SelectValue(){ return null; }

export function SelectContent({className="", children}) {
  const {open} = useContext(SelCtx);
  if(!open) return null;
  return (
    <div className={`absolute z-50 mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-1 ${className}`}>
      {children}
    </div>
  );
}

export function SelectItem({value, children, className=""}) {
  const {setValue,setOpen,register} = useContext(SelCtx);
  useEffect(()=>{ register(value, children); }, [value, children]);
  return (
    <div
      onClick={()=>{ setValue(value); setOpen(false); }}
      className={`cursor-pointer rounded-md px-3 py-2 hover:bg-slate-800 ${className}`}
      role="option"
    >
      {children}
    </div>
  );
}
