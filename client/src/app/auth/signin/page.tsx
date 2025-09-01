"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function SignIn(){
  const [email,setEmail] = useState("admin@themavericksgroup.co.uk");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState<string|undefined>();
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e:React.FormEvent)=>{
    e.preventDefault();
    setErr(undefined); setLoading(true);
    try{
      const res = await fetch(`${API}/auth/login`,{
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();
      if(!res.ok){ setErr(json?.error || "Login failed"); return; }
      localStorage.setItem("token", json.token);
      router.push("/cart");
    }catch(e:any){ setErr(e?.message||"Network error"); }
    finally{ setLoading(false); }
  };

  return (
    <div className="panel" style={{maxWidth:460,margin:"0 auto"}}>
      <h2 style={{marginTop:0}}>Sign in</h2>
      <form onSubmit={submit} style={{display:"grid",gap:12}}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
               style={{padding:10,borderRadius:10,border:"1px solid #1f2a44",background:"#0b162d",color:"white"}}/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}
               style={{padding:10,borderRadius:10,border:"1px solid #1f2a44",background:"#0b162d",color:"white"}}/>
        {err && <div style={{color:"#ffb4b4"}}>{err}</div>}
        <button className="btn" disabled={loading}>{loading?"Signing in…":"Sign in"}</button>
      </form>
      <div style={{opacity:.6,fontSize:12,marginTop:10}}>For now, this uses your existing API at <code>/auth/login</code>. Token is saved to <code>localStorage</code>.</div>
    </div>
  );
}
