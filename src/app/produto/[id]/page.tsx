"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function ProdutoPage(){
  const { id } = useParams();
  const router = useRouter();
  const [p, setP] = useState<any>(null);

  useEffect(()=>{
    supabase.from("produtos").select("*").eq("id", id).single().then(({data})=>setP(data));
  },[id]);

  if(!p) return <div style={{padding:60, textAlign:"center"}}>Carregando...</div>;

  const add = () => {
    const c = JSON.parse(localStorage.getItem("carrinho")||"[]");
    c.push({...p, qtd:1});
    localStorage.setItem("carrinho", JSON.stringify(c));
    router.push("/carrinho");
  };

  return (
    <div style={{background:"#f5f5f7", minHeight:"100vh", fontFamily:"system-ui"}}>
      <header style={{background:"white", height:68, display:"flex", alignItems:"center", padding:"0 24px", justifyContent:"space-between", borderBottom:"1px solid #e5e5e5"}}>
        <a href="/" style={{fontWeight:800, color:"#1d1d1f", textDecoration:"none"}}>ELETROSHOP</a>
        <a href="/carrinho" style={{textDecoration:"none", color:"#1d1d1f", fontWeight:700, fontSize:12}}>Carrinho</a>
      </header>
      <div style={{maxWidth:1100, margin:"0 auto", padding:24, display:"grid", gridTemplateColumns:"1fr 1fr", gap:24}}>
        <div style={{background:"white", borderRadius:20, padding:24, border:"1px solid #e5e5e5", display:"grid", placeItems:"center"}}>
          <img src={p.imagem_url} style={{width:"100%", maxHeight:500, objectFit:"contain"}}/>
        </div>
        <div style={{background:"white", borderRadius:20, padding:24, border:"1px solid #e5e5e5"}}>
          <div style={{background:"#0a84ff", color:"white", display:"inline-block", padding:"5px 12px", borderRadius:99, fontSize:11, fontWeight:800}}>{p.tag||"ORIGINAL"}</div>
          <h1 style={{fontSize:28, fontWeight:900, marginTop:12}}>{p.nome}</h1>
          <p style={{color:"#666", fontSize:14, marginTop:12}}>{p.descricao||"Produto original com garantia e entrega rápida em Imperatriz."}</p>
          <div style={{fontSize:32, fontWeight:900, color:"#0a84ff", marginTop:20}}>R$ {Number(p.preco).toFixed(2)}</div>
          <div style={{marginTop:20, display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
            <button onClick={add} style={{height:48, borderRadius:10, border:"1px solid #1d1d1f", background:"white", fontWeight:700}}>Adicionar</button>
            <button onClick={add} style={{height:48, borderRadius:10, border:"none", background:"#1d1d1f", color:"white", fontWeight:800}}>Comprar agora</button>
          </div>
        </div>
      </div>
    </div>
  )
}