"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const WHATSAPP = "5599984806628";
const INSTAGRAM = "https://instagram.com/eletroshop_itz";
const FRETE_FIXO = 10.00;

const produtosBase = [
  { id: 1, nome: "Carregador USB-C 30W Turbo", preco: 59.90, img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500", tag: "30% OFF", cor: "#ff3b30", nota: "4.7 (128)" },
  { id: 2, nome: "Cabo USB-C 1m Nylon", preco: 19.90, img: "https://images.unsplash.com/photo-1629131726692-a0f23e7a5cbd?w=500", tag: "Novo", cor: "#0a84ff", nota: "4.9 (342)" },
  { id: 3, nome: "Fone Bluetooth TWS com Case", preco: 149.90, img: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500", tag: "Mais vendido", cor: "#34c759", nota: "4.6 (1.024)" },
  { id: 4, nome: "Capinha iPhone 15 MagSafe", preco: 39.90, img: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500", tag: "Top", cor: "#ffcc00", nota: "4.5 (512)" },
  { id: 5, nome: "Power Bank 10000mAh 22.5W", preco: 89.90, img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500", tag: "15% OFF", cor: "#ff3b30", nota: "4.6 (278)" },
  { id: 6, nome: "Headphone Wireless Bluetooth", preco: 229.90, img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500", tag: "Frete Grátis", cor: "#0a84ff", nota: "4.7 (401)" },
];

export default function Home() {
  const [produtos, setProdutos] = useState<any[]>(produtosBase);
  const [busca, setBusca] = useState("");
  const [cat, setCat] = useState("Eletrônicos");

  useEffect(() => {
    supabase.from("produtos").select("*").then(({ data }) => {
      if (data && data.length > 0) setProdutos(data);
    });
  }, []);

  const filtrados = produtos.filter((p: any) => p.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div style={{ background: "#f5f5f7", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* HEADER BRANCO PROFISSIONAL SEM EMOJI */}
      <header style={{ background: "white", height: 68, display: "flex", alignItems: "center", padding: "0 24px", justifyContent: "space-between", borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, background: "#e5f0ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0a84ff"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>
          </div>
          <span style={{ fontWeight: 900, fontSize: 18, color: "#1d1d1f" }}>ELETROSHOP</span>
        </div>

        <div style={{ flex: 1, maxWidth: 560, margin: "0 24px", position: "relative" }}>
          <svg style={{ position: "absolute", left: 14, top: 12 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="11" cy="11" r="6"/><path d="M21 21l-3.5-3.5"/></svg>
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar carregadores, cabos, fones, capinhas..." style={{ width: "100%", height: 40, borderRadius: 999, border: "1px solid #d2d2d7", background: "#f5f5f7", padding: "0 16px 0 42px", fontSize: 13, outline: "none" }} />
        </div>

        <div style={{ display: "flex", gap: 18, alignItems: "center", fontSize: 11, fontWeight: 600 }}>
          <a href="/carrinho" style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none", color: "#1d1d1f" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M6 6L5 2H2"/></svg>
            Carrinho
          </a>
        </div>
      </header>

      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 20, padding: 20 }}>
        {/* LATERAL */}
        <aside style={{ width: 230 }}>
          <div style={{ background: "white", borderRadius: 12, padding: 16, border: "1px solid #e5e5e5" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Categorias</div>
            {["Eletrônicos","Carregadores","Cabos","Fones de Ouvido","Capas para Celular","Power Banks","Smartwatches","Acessórios"].map(c => (
              <div key={c} onClick={()=>setCat(c)} style={{ padding: "9px 10px", borderRadius: 8, background: cat===c ? "#e5f0ff" : "transparent", color: cat===c ? "#0a84ff" : "#333", fontSize: 13, fontWeight: cat===c?700:500, cursor: "pointer", marginBottom: 2 }}>{c}</div>
            ))}
          </div>
          <div style={{ background: "white", borderRadius: 12, padding: 16, marginTop: 16, border: "1px solid #e5e5e5" }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>Frete fixo Imperatriz</div>
            <div style={{ marginTop: 8, background: "#1d1d1f", color: "white", borderRadius: 8, padding: "8px 12px", fontSize: 12, fontWeight: 700, textAlign: "center" }}>R$ {FRETE_FIXO.toFixed(2).replace(".", ",")} - Qualquer quantidade</div>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1 }}>
          {/* BANNER PROFISSIONAL COM FOTO REAL, SEM EMOJI */}
          <div style={{ background: "linear-gradient(90deg,#0a84ff 0%, #00d1b2 100%)", borderRadius: 14, padding: "24px 28px", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900 }}>Ofertas em Eletrônicos</div>
              <div style={{ fontSize: 13, opacity: 0.95, marginTop: 4 }}>Até 30% OFF + Frete fixo R$ 10 Imperatriz</div>
              <a href="#produtos" style={{ marginTop: 12, display: "inline-block", background: "white", color: "#0a84ff", padding: "8px 16px", borderRadius: 8, fontWeight: 800, fontSize: 13, textDecoration: "none" }}>Comprar agora</a>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <img src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200" style={{ width: 70, height: 70, borderRadius: 12, objectFit: "cover", border: "2px solid rgba(255,255,255,0.3)" }} />
              <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200" style={{ width: 70, height: 70, borderRadius: 12, objectFit: "cover", border: "2px solid rgba(255,255,255,0.3)" }} />
            </div>
          </div>

          <div id="produtos" style={{ marginTop: 20, fontWeight: 700, fontSize: 16 }}>Produtos em Destaque</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginTop: 12 }}>
            {filtrados.map((p:any)=>(
              <div key={p.id} style={{ background: "white", borderRadius: 12, padding: 12, border: "1px solid #e5e5e5", position: "relative" }}>
                <div style={{ position: "absolute", top: 8, left: 8, background: p.cor, color: p.cor==="#ffcc00"?"black":"white", fontSize: 10, fontWeight: 800, padding: "3px 7px", borderRadius: 6 }}>{p.tag}</div>
                <img src={p.img || p.imagem_url} style={{ width: "100%", height: 110, objectFit: "contain", marginTop: 10 }} />
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 8, height: 30, overflow: "hidden", color: "#1d1d1f" }}>{p.nome}</div>
                <div style={{ color: "#0a84ff", fontWeight: 800, fontSize: 15, marginTop: 6 }}>R$ {Number(p.preco).toFixed(2).replace(".",",")}</div>
                <div style={{ fontSize: 11, color: "#666" }}>+ R$ {FRETE_FIXO.toFixed(2).replace(".",",")} frete fixo</div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* BOTÕES FLUTUANTES CERTOS */}
      <div style={{ position: "fixed", right: 18, bottom: 22, display: "flex", flexDirection: "column", gap: 12, zIndex: 999 }}>
        <a href={INSTAGRAM} target="_blank" style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .3 2.5.5.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.4 1.3.5 2.5.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 2-.5 2.5-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.3.4-2.5.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.3-2.5-.5a3.5 3.5 0 01-1.4-.9 3.5 3.5 0 01-.9-1.4c-.2-.5-.4-1.3-.5-2.5C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-2 .5-2.5.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.3-.4 2.5-.5C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4a2 2 0 00-.8.5 2 2 0 00-.5.8c-.2.4-.3 1-.4 2.1C4.4 8.5 4.4 8.9 4.4 12s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.1.3.3.6.5.8.2.2.5.4.8.5.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.3-.1.6-.3.8-.5.2-.2.4-.5.5-.8.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1a2 2 0 00-.5-.8 2 2 0 00-.8-.5c-.4-.2-1-.3-2.1-.4C15.5 4 15.1 4 12 4zm0 3.9a4.1 4.1 0 110 8.2 4.1 4.1 0 010-8.2zm0 6.4a2.3 2.3 0 100-4.6 2.3 2.3 0 000 4.6zm4.9-6.7a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
        </a>
        <a href={`https://wa.me/${WHATSAPP}?text=Olá! Vim pelo site da Eletroshop`} target="_blank" style={{ width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M19.05 4.91A9.82 9.82 0 0012 0C6.03 0 1.17 4.86 1.17 10.83c0 1.91.5 3.78 1.44 5.42L0 24l7.96-2.09a10.78 10.78 0 005.04 1.28h.01c5.97 0 10.83-4.86 10.83-10.83a10.78 10.78 0 00-3.16-7.64l.37-.81zM12 21.1a8.9 8.9 0 01-4.53-1.24l-.32-.19-4.72 1.24 1.26-4.6-.21-.34A8.9 8.9 0 013.09 10.83C3.09 5.92 7.09 1.92 12 1.92a8.9 8.9 0 016.31 2.61 8.84 8.84 0 012.61 6.3c0 4.91-4 8.9-8.92 8.9zm4.88-6.68c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14s-.7.88-.86 1.06-.32.21-.59.07c-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.32.4-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.99 2.66 1.12 2.84c.14.18 1.94 2.96 4.7 4.15.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.29.23-.63.23-1.17.16-1.29-.07-.11-.25-.18-.52-.32z"/></svg>
        </a>
      </div>
    </div>
  );
}