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
    supabase.from("produtos").select("*").order("id",{ascending:false}).then(({data})=>{
      if(data) setProds(data);
    });
    const c = JSON.parse(localStorage.getItem("carrinho")||"[]");
    setQtd(c.reduce((s:any,i:any)=>s+(i.qtd||1),0));
  },[]);

  const filtrados = prods.filter(p=>p.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div style={{background:"#f5f5f7", minHeight:"100vh", fontFamily:"system-ui"}}>
      <header style={{background:"white", height:72, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 28px", borderBottom:"1px solid #e5e5e5", position:"sticky", top:0, zIndex:100}}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div style={{width:36, height:36, background:"#0a84ff", borderRadius:9, display:"grid", placeItems:"center", color:"white", fontWeight:900}}>E</div>
          <span style={{fontWeight:900, fontSize:18, letterSpacing:-0.5}}>ELETROSHOP</span>
        </div>
        <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar carregadores, cabos, fones..." style={{width:"38%", height:44, borderRadius:999, border:"1px solid #d2d2d7", padding:"0 18px", background:"#f5f5f7", outline:"none", fontSize:13}}/>
        
        <a href="/carrinho" style={{display:"flex", alignItems:"center", gap:10, background:"#0a84ff", color:"white", padding:"13px 24px", borderRadius:999, fontWeight:800, fontSize:14, textDecoration:"none", boxShadow:"0 8px 24px rgba(10,132,255,0.4)", border:"2px solid #0a84ff"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          Carrinho
          <span style={{background:"white", color:"#0a84ff", borderRadius:99, padding:"3px 9px", fontSize:12, fontWeight:900, minWidth:20, textAlign:"center"}}>{qtd}</span>
        </a>
      </header>

      <div style={{maxWidth:1280, margin:"0 auto", padding:20}}>
        <div style={{background:"linear-gradient(90deg,#0a84ff 0%,#00d1b2 100%)", borderRadius:18, padding:"22px 26px", color:"white", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div><div style={{fontSize:22, fontWeight:900}}>Ofertas em Eletrônicos</div><div style={{fontSize:13, opacity:0.9, marginTop:4}}>Até 30% OFF + Frete fixo R$ 10 Imperatriz</div></div>
          <div style={{background:"white", color:"#0a84ff", padding:"8px 14px", borderRadius:999, fontWeight:800, fontSize:11}}>ENTREGA 24H</div>
        </div>

        <div style={{marginTop:18, fontWeight:700, fontSize:14}}>Produtos em Destaque - Clique para comprar ({filtrados.length})</div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:14, marginTop:14}}>
          {filtrados.map(p=>(
            <div key={p.id} onClick={()=>router.push(`/produto/${p.id}`)} style={{background:"white", borderRadius:14, padding:12, border:"1px solid #e8e8ed", cursor:"pointer", boxShadow:"0 2px 10px rgba(0,0,0,0.03)"}}>
              <div style={{fontSize:10, fontWeight:800, background:p.tag?.includes("OFF")?"#ff3b30":p.tag?.includes("Frete")?"#0a84ff":"#34c759", color:"white", display:"inline-block", padding:"3px 8px", borderRadius:6}}>{p.tag||"ORIGINAL"}</div>
              <div style={{height:130, display:"grid", placeItems:"center", marginTop:10, background:"#fbfbfd", borderRadius:12}}>
                <img src={p.imagem_url || "https://via.placeholder.com/150"} onError={(e:any)=>e.target.src="https://via.placeholder.com/150"} style={{width:"85%", height:110, objectFit:"contain"}}/>
              </div>
              <div style={{fontSize:12.5, fontWeight:600, marginTop:10, height:32, overflow:"hidden", lineHeight:1.3}}>{p.nome}</div>
              <div style={{color:"#0a84ff", fontWeight:900, fontSize:15, marginTop:6}}>R$ {Number(p.preco).toFixed(2)}</div>
              <div style={{marginTop:10, background:"#1d1d1f", color:"white", textAlign:"center", padding:"9px", borderRadius:10, fontSize:12, fontWeight:700}}>Comprar</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}