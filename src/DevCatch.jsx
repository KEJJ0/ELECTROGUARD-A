// src/DevCatch.jsx
import React from "react";

export class DevCatch extends React.Component {
  constructor(p){ super(p); this.state = { err:null }; }
  static getDerivedStateFromError(err){ return { err }; }
  componentDidCatch(err, info){ console.error("🔥 Runtime error:", err, info); }
  render(){
    if(this.state.err){
      return (
        <pre style={{whiteSpace:"pre-wrap", padding:"16px", background:"#111", color:"#f55"}}>
{String(this.state.err?.stack || this.state.err?.message || this.state.err)}
        </pre>
      );
    }
    return this.props.children;
  }
}
