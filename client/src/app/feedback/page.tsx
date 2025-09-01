"use client";
import { useState } from "react";
export default function Feedback(){
  const [msg,setMsg]=useState(""); const [ok,setOk]=useState(false);
  return (
    <div className="panel">
      <h2 style={{marginTop:0}}>Feedback</h2>
      {ok ? <div>Thanks for your feedback!</div> : (
        <>
          <textarea value={msg} onChange={e=>setMsg(e.target.value)} rows={6}
            style={{width:"100%",background:"#0b162d",color:"white",border:"1px solid #1f2a44",borderRadius:10,padding:10}}/>
          <div style={{marginTop:10}}><button className="btn" onClick={()=>setOk(true)}>Send</button></div>
        </>
      )}
    </div>
  );
}
