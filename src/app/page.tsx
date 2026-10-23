"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Home() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    supabase.from("produtos").select("*").then(({ data }) => {
      if (data) setProdutos(data);
    });
  }, []);

  const filtrados = produtos.filter((p: any) => p.nome.toLowerCase().includes(busca.toLowerCase()));
  const WHATSAPP = "5599999999999";
  const INSTAGRAM = "https://instagram.com/seuinstagram";

  return (
    <div style={{ background: "#EBEBEB", minHeight: "100vh" }}>
      {/* HEADER AMARELO MERCADO LIVRE COM LOGO */}
      <div style={{ background: "#FFE600", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid #e5c800" }}>
        <div style={{ display: "flex", alignItems: "center", minWidth: 180 }}>
          <img src="/logo.png" alt="ELETROSHOP" style={{ height: 36, objectFit: "contain" }} />
        </div>

        <div style={{ flex: 1, maxWidth: 600, margin: "0 20px" }}>
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar celular, capinha, carregador..." style={{ width: "100%", height: 40, borderRadius: 6, border: "none", padding: "0 15px", background: "white", color: "black", fontSize: 14, outline: "none", boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
        </div>

        <a href="/carrinho" style={{ background: "black", color: "#FFE600", padding: "10px 18px", borderRadius: 6, fontWeight: 900, fontSize: 13, textDecoration: "none", whiteSpace: "nowrap" }}>🛒 Carrinho (0)</a>
      </div>

      <div style={{ background: "white", textAlign: "center", padding: "7px", fontSize: 12, color: "#333", fontWeight: 700, borderBottom: "1px solid #ddd" }}>
        📍 ENTREGA HOJE EM IMPERATRIZ E DAVINÓPOLIS - MA | <span style={{ background: "black", color: "#FFE600", padding: "2px 8px", borderRadius: 10, fontSize: 10 }}>ENTREGA RÁPIDA</span>
      </div>

      <div style={{ maxWidth: 1200, margin: "20px auto", padding: "0 20px" }}>
        <div style={{ background: "white", borderRadius: 8, padding: "60px 20px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: 40 }}>📱</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "black", marginTop: 10 }}>Nosso catálogo está sendo atualizado</h2>
          <p style={{ color: "#666", marginTop: 8, fontSize: 14 }}>Em breve muitos eletrônicos com entrega rápida em Imperatriz!</p>
        </div>
      </div>

      {/* BOTÕES FLUTUANTES - WHATSAPP E INSTAGRAM */}
      <a href={`https://wa.me/${WHATSAPP}?text=Olá! Vim pelo site da Eletroshop`} target="_blank" style={{ position: "fixed", bottom: 90, right: 20, background: "#25D366", width: 58, height: 58, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, textDecoration: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", zIndex: 999 }}>💬</a>
      
      <a href={INSTAGRAM} target="_blank" style={{ position: "fixed", bottom: 20, right: 20, background: "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)", width: 58, height: 58, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, textDecoration: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", zIndex: 999 }}>📷</a>
    </div>
  );
}