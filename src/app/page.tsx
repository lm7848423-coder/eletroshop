"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Home(){
  const [prods, setProds] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [qtdCarrinho, setQtdCarrinho] = useState(0);
  const router = useRouter();

  useEffect(()=>{
    supabase.from("produtos").select("*").order("id",{ascending:false}).then(({data})=>setProds(data||[]));
    const c = JSON.parse(localStorage.getItem("carrinho")||"[]");
    setQtdCarrinho(c.length);
  },[]);

  const filtrados = prods.filter(p=>p.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div style={{background:"#f5f5f7", minHeight:"100vh", fontFamily:"system-ui"}}>
      <header style={{background:"rgba(255,255,255,0.92)", backdropFilter:"blur(16px)", height:70, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 28px", borderBottom:"1px solid #e5e5e5", position:"sticky", top:0, zIndex:100}}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div style={{width:32, height:32, background:"#0a84ff", borderRadius:8, display:"grid", placeItems:"center", color:"white", fontWeight:900, fontSize:14}}>E</div>
          <span style={{fontWeight:900, fontSize:17, letterSpacing:-0.5}}>ELETROSHOP</span>
        </div>
        <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar produto..." style={{width:"38%", height:42, borderRadius:999, border:"1px solid #d2d2d7", padding:"0 18px", background:"#f5f5f7", outline:"none", fontSize:13}}/>
        <a href="/carrinho" style={{display:"flex", alignItems:"center", gap:8, background:"#0a84ff", color:"white", padding:"11px 22px", borderRadius:999, fontSize:13, fontWeight:800, textDecoration:"none", boxShadow:"0 6px 16px rgba(10,132,255,0.35)", position:"relative"}}>
          <span style={{fontSize:16}}>🛒</span>
          Carrinho
          {qtdCarrinho > 0 && <span style={{background:"white", color:"#0a84ff", fontSize:11, fontWeight:900, padding:"2px 8px", borderRadius:99, marginLeft:2, minWidth:18, textAlign:"center"}}>{qtdCarrinho}</span>}
        </a>
      </header>

      <div style={{maxWidth:1280, margin:"0 auto", padding:"24px"}}>
        <div style={{background:"linear-gradient(135deg,#0a84ff 0%,#00d1b2 100%)", borderRadius:20, padding:"32px 36px", color:"white", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <div style={{fontSize:30, fontWeight:900, lineHeight:1.1, letterSpacing:-0.5}}>Ofertas em Eletrônicos</div>
            <div style={{fontSize:14, marginTop:8, opacity:0.92}}>Até 30% OFF + Frete fixo R$ 10 em Imperatriz-MA • Entrega 24h</div>
          </div>
          <div style={{background:"white", color:"#0a84ff", padding:"12px 20px", borderRadius:999, fontWeight:800, fontSize:12, boxShadow:"0 4px 12px rgba(0,0,0,0.1)"}}>ENTREGA RÁPIDA</div>
        </div>

        <div style={{marginTop:32, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div style={{fontSize:17, fontWeight:700, color:"#1d1d1f"}}>Produtos originais ({filtrados.length})</div>
          <div style={{fontSize:12, color:"#86868b", background:"white", padding:"6px 12px", borderRadius:99, border:"1px solid #e5e5e5"}}>Clique para ver detalhes</div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:16, marginTop:18}}>
          {filtrados.map(p=>(
            <div key={p.id} onClick={()=>router.push(`/produto/${p.id}`)} style={{background:"white", borderRadius:18, padding:14, border:"1px solid #e8e8ed", cursor:"pointer", boxShadow:"0 4px 16px rgba(0,0,0,0.04)", transition:"transform 0.2s"}}>
              <div style={{background:p.cor||"#0a84ff", color:"white", display:"inline-block", fontSize:10, fontWeight:800, padding:"4px 9px", borderRadius:7, letterSpacing:0.5}}>{p.tag||"ORIGINAL"}</div>
              <div style={{height:150, display:"grid", placeItems:"center", marginTop:12, background:"#fbfbfd", borderRadius:14}}>
                <img src={p.imagem_url} style={{width:"90%", height:125, objectFit:"contain"}}/>
              </div>
              <div style={{fontSize:13.5, fontWeight:600, marginTop:12, color:"#1d1d1f", height:36, lineHeight:1.3, overflow:"hidden"}}>{p.nome}</div>
              {p.preco_original && <div style={{fontSize:11.5, color:"#999", textDecoration:"line-through", marginTop:4}}>R$ {Number(p.preco_original).toFixed(2)}</div>}
              <div style={{color:"#0a84ff", fontWeight:900, fontSize:17, marginTop:2}}>R$ {Number(p.preco).toFixed(2)}</div>
              <div style={{marginTop:12, background:"#1d1d1f", color:"white", textAlign:"center", padding:"10px", borderRadius:11, fontSize:12.5, fontWeight:700}}>Ver detalhes</div>
            </div>
          ))}
        </div>

        {filtrados.length===0 && <div style={{textAlign:"center", marginTop:60, color:"#86868b"}}>Nenhum produto encontrado. Adicione no /admin</div>}
      </div>
    </div>
  )
}