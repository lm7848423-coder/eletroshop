"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function Home() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    supabase.from("produtos").select("*").then(({ data }) => {
      if (data) setProdutos(data);
    });
  }, []);

  const filtrados = produtos.filter((p: any) => p.nome.toLowerCase().includes(busca.toLowerCase()));
  
  const WHATSAPP = "5599999999999"; // SEU NUMERO COM DDD
  const INSTAGRAM = "https://instagram.com/seuinstagram";

  return (
    <div style={{ minHeight: "100vh", background: "#EBEBEB" }}>
      {/* HEADER MERCADO LIVRE */}
      <header style={{ background: "#FFE600", padding: "12px 16px", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ background: "black", color: "#FFE600", width: 42, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, fontWeight: 900, fontSize: 20 }}>E</div>
          </Link>
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontWeight: 900, color: "black", fontSize: 16, letterSpacing: "-0.5px" }}>ELETROSHOP</div>
            <div style={{ fontSize: 8, color: "black", fontWeight: 800 }}>IMPERATRIZ E DAVINOPOLIS</div>
          </div>
          
          <div style={{ flex: 1, maxWidth: "600px", margin: "0 auto", position: "relative" }}>
            <input 
              value={busca} 
              onChange={e=>setBusca(e.target.value)} 
              placeholder="Buscar celular, fone, carregador..." 
              style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "none", background: "white", color: "black", boxShadow: "0 1px 2px rgba(0,0,0,0.2)", outline: "none", fontSize: 14 }}
            />
          </div>

          <Link href="/carrinho" style={{ background: "black", color: "#FFE600", padding: "10px 16px", borderRadius: 8, fontWeight: 800, fontSize: 13, textDecoration: "none" }}>🛒 Carrinho</Link>
        </div>
      </header>

      <div style={{ background: "white", borderBottom: "1px solid #ddd", padding: "8px 16px", fontSize: 12, color: "#333", display: "flex", gap: 12, justifyContent: "center" }}>
        <span>📍 Entrega hoje em Imperatriz e Davinópolis - MA</span>
        <span style={{ background: "black", color: "#FFE600", padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>ENTREGA RÁPIDA</span>
      </div>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 16px" }}>
        {filtrados.length === 0 ? (
          <div style={{ background: "white", borderRadius: 12, padding: "60px 20px", textAlign: "center", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
            <div style={{ fontSize: 50 }}>📱</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "black", marginTop: 12 }}>Nosso catálogo está sendo atualizado</h2>
            <p style={{ color: "#666", marginTop: 8 }}>Em breve muitos eletrônicos com entrega rápida em Imperatriz!</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {filtrados.map((p: any) => (
              <div key={p.id} style={{ background: "white", borderRadius: 12, padding: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                <img src={p.imagem_url} style={{ width: "100%", height: 160, objectFit: "contain" }} />
                <h3 style={{ fontSize: 14, color: "black", marginTop: 10, height: 40, overflow: "hidden" }}>{p.nome}</h3>
                <p style={{ fontWeight: 900, fontSize: 20, color: "black", marginTop: 8 }}>R$ {Number(p.preco).toFixed(2)}</p>
                <a href={`https://wa.me/${WHATSAPP}?text=Quero ${p.nome}`} target="_blank" style={{ marginTop: 10, display: "block", background: "black", color: "#FFE600", textAlign: "center", padding: "10px", borderRadius: 8, fontWeight: 800, textDecoration: "none", fontSize: 13 }}>Comprar no WhatsApp</a>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 2 BOTÕES FLUTUANTES QUE VOCÊ PEDIU */}
      <div style={{ position: "fixed", bottom: 20, right: 20, display: "flex", flexDirection: "column", gap: 12, zIndex: 999 }}>
        <a href={`https://wa.me/${WHATSAPP}?text=Olá! Vim pelo site da Eletroshop`} target="_blank" 
           style={{ background: "#25D366", width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: "white", textDecoration: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>💬</a>
        
        <a href={INSTAGRAM} target="_blank" 
           style={{ background: "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)", width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "white", textDecoration: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>📷</a>
      </div>
    </div>
  );
}