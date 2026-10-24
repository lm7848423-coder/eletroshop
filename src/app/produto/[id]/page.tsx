"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function ProdutoPage(){
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [p,setP]=useState<any>(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    if(!id) return;
    supabase.from("produtos").select("*").eq("id",id).single().then(({data})=>{ setP(data); setLoading(false); });
  },[id]);
  const add=()=>{
    const c = JSON.parse(localStorage.getItem("carrinho")||"[]");
    c.push({...p, qtd:1});
    localStorage.setItem("carrinho", JSON.stringify(c));
    router.push("/carrinho");
  };
  if(loading) return <div style={{padding:40}}>Carregando...</div>;
  if(!p) return <div style={{padding:40}}>Produto não encontrado</div>;
  return (
    <div style={{maxWidth:1000, margin:"0 auto", padding:24, fontFamily:"system-ui", display:"grid", gridTemplateColumns:"1fr 1fr", gap:24}}>
      <div style={{background:"white", borderRadius:16, padding:20, display:"grid", placeItems:"center"}}><img src={p.imagem_url} style={{width:"90%", maxHeight:400, objectFit:"contain"}}/></div>
      <div>
        <h1 style={{fontSize:26, fontWeight:900}}>{p.nome}</h1>
        <div style={{fontSize:28, fontWeight:900, color:"#0a84ff", marginTop:12}}>R$ {Number(p.preco).toFixed(2)}</div>
        <button onClick={add} style={{marginTop:20, width:"100%", background:"#0a84ff", color:"white", border:0, padding:"16px", borderRadius:12, fontWeight:800, fontSize:16}}>Adicionar ao Carrinho</button>
        <a href="/" style={{display:"block", marginTop:16, color:"#0a84ff"}}>← Voltar</a>
      </div>
    </div>
  )
}