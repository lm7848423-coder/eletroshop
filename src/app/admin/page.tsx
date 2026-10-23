"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin(){
  const [prods, setProds] = useState<any[]>([]);
  const [form, setForm] = useState({nome:"", preco:"", imagem_url:"", tag:"ORIGINAL"});
  const load = ()=> supabase.from("produtos").select("*").order("id",{ascending:false}).then(({data})=>setProds(data||[]));
  useEffect(()=>{load()},[]);

  const salvar = async()=>{
    if(!form.nome || !form.preco) return alert("Nome e preço obrigatórios");
    await supabase.from("produtos").insert([{...form, preco: Number(form.preco), preco_original: Number(form.preco)*1.3}]);
    setForm({nome:"", preco:"", imagem_url:"", tag:"ORIGINAL"});
    load();
    alert("Produto adicionado! Já aparece no site do cliente");
  };
  const deletar = async(id:number)=>{
    await supabase.from("produtos").delete().eq("id",id);
    load();
  };

  return (
    <div style={{maxWidth:900, margin:"0 auto", padding:20, fontFamily:"system-ui"}}>
      <h1 style={{fontWeight:900}}>Painel ADM - Afeta o site na hora</h1>
      <div style={{display:"flex", gap:8, marginTop:12, flexWrap:"wrap"}}>
        <input placeholder="Nome" value={form.nome} onChange={e=>setForm({...form, nome:e.target.value})} style={{border:"1px solid #ddd", padding:8, borderRadius:8, flex:1}}/>
        <input placeholder="Preço" type="number" value={form.preco} onChange={e=>setForm({...form, preco:e.target.value})} style={{border:"1px solid #ddd", padding:8, borderRadius:8, width:100}}/>
        <input placeholder="Link imagem" value={form.imagem_url} onChange={e=>setForm({...form, imagem_url:e.target.value})} style={{border:"1px solid #ddd", padding:8, borderRadius:8, flex:1}}/>
        <button onClick={salvar} style={{background:"#0a84ff", color:"white", border:0, padding:"8px 18px", borderRadius:8, fontWeight:800}}>Adicionar</button>
      </div>
      <div style={{marginTop:20, display:"grid", gap:8}}>
        {prods.map(p=>(
          <div key={p.id} style={{display:"flex", justifyContent:"space-between", alignItems:"center", background:"white", padding:10, borderRadius:8, border:"1px solid #eee"}}>
            <div style={{display:"flex", gap:10, alignItems:"center"}}><img src={p.imagem_url} style={{width:40, height:40, objectFit:"contain"}}/>{p.nome} - R$ {p.preco}</div>
            <button onClick={()=>deletar(p.id)} style={{background:"#ff3b30", color:"white", border:0, padding:"6px 10px", borderRadius:6}}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  )
}