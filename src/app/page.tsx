"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Home(){
  const [prods, setProds] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [qtd, setQtd] = useState(0);
  const router = useRouter();
  useEffect(()=>{
    supabase.from("produtos").select("*").order("id",{ascending:false}).then(({data})=>setProds(data||[]));
    const c = JSON.parse(localStorage.getItem("carrinho")||"[]");
    setQtd(c.reduce((s:any,i:any)=>s+(i.qtd||1),0));
  },[]);
  const filtrados = prods.filter(p=>p.nome.toLowerCase().includes(busca.toLowerCase()));
  return (
    <div style={{background:"#f5f5f7", minHeight:"100vh", fontFamily:"system-ui"}}>
      <header style={{background:"white", height:70, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px", borderBottom:"1px solid #e5e5e5", position:"sticky", top:0, zIndex:100}}>
        <span style={{fontWeight:900, fontSize:18}}>ELETROSHOP</span>
        <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar..." style={{width:"40%", height:42, borderRadius:999, border:"1px solid #d2d2d7", padding:"0 18px", background:"#f5f5f7"}}/>
        <a href="/carrinho" style={{display:"flex", alignItems:"center", gap:10, background:"#0a84ff", color:"white", padding:"12px 22px", borderRadius:999, fontWeight:800, fontSize:14, textDecoration:"none", boxShadow:"0 8px 20px rgba(10,132,255,0.4)"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          Carrinho {qtd>0 && <span style={{background:"white", color:"#0a84ff", borderRadius:99, padding:"3px 9px", fontSize:12, fontWeight:900}}>{qtd}</span>}
        </a>
      </header>
      <div style={{maxWidth:1280, margin:"0 auto", padding:24}}>
        <div style={{background:"linear-gradient(135deg,#0a84ff,#00d1b2)", borderRadius:20, padding:"28px 32px", color:"white", fontWeight:900, fontSize:26}}>Ofertas em Eletrônicos<div style={{fontSize:13, fontWeight:400, marginTop:4}}>Frete fixo R$10 Imperatriz • Entrega 24h</div></div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:16, marginTop:18}}>
          {filtrados.map(p=>(
            <div key={p.id} onClick={()=>router.push(`/produto/${p.id}`)} style={{background:"white", borderRadius:16, padding:12, border:"1px solid #e5e5e5", cursor:"pointer"}}>
              <div style={{fontSize:10, fontWeight:800, background:"#0a84ff", color:"white", display:"inline-block", padding:"4px 8px", borderRadius:6}}>{p.tag}</div>
              <img src={p.imagem_url} style={{width:"100%", height:120, objectFit:"contain", marginTop:8}}/>
              <div style={{fontSize:13, fontWeight:600, marginTop:8}}>{p.nome}</div>
              <div style={{color:"#0a84ff", fontWeight:900, marginTop:6}}>R$ {Number(p.preco).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}