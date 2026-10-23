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

  return (
    <div style={{ background: "#EBEBEB", minHeight: "100vh" }}>
      {/* HEADER AMARELO MERCADO LIVRE */}
      <div style={{ background: "#FFE600", height: "70px", display: "flex", alignItems: "center", padding: "0 20px", gap: "20px", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid #e5c800" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ background: "black", color: "#FFE600", width: 38, height: 38, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20 }}>E</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 15, color: "black", lineHeight: 1 }}>ELETROSHOP</div>
            <div style={{ fontSize: 7, fontWeight: 800, color: "black" }}>IMPERATRIZ E DAVINOPOLIS</div>
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: 600 }}>
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar capinha, carregador, película..." style={{ width: "100%", height: 40, borderRadius: 6, border: "none", padding: "0 15px", background: "white", color: "black", fontSize: 14, outline: "none", boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
        </div>

        <a href="/carrinho" style={{ background: "black", color: "#FFE600", padding: "10px 18px", borderRadius: 6, fontWeight: 900, fontSize: 13, textDecoration: "none" }}>🛒 Carrinho (0)</a>
      </div>

      <div style={{ background: "#fff159", textAlign: "center", padding: "6px", fontSize: 12, color: "#333", fontWeight: 700, borderBottom: "1px solid #eee" }}>
        📍 ENTREGA HOJE EM IMPERATRIZ E DAVINÓPOLIS - MA | ⚡ ENTREGA RÁPIDA
      </div>

      <div style={{ maxWidth: 1200, margin: "20px auto", padding: "0 20px" }}>
        <div style={{ background: "white", borderRadius: 8, padding: "50px 20px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "black" }}>Em breve muitas ofertas! 🔌</h2>
          <p style={{ color: "#666", marginTop: 8, fontSize: 14 }}>Capinhas, carregadores, películas e muito mais.</p>
        </div>
      </div>

      {/* BOTÕES FLUTUANTES QUE VOCÊ PEDIU */}
      <a href={`https://wa.me/${WHATSAPP}?text=Olá! Vim pelo site`} target="_blank" style={{ position: "fixed", bottom: 90, right: 20, background: "#25D366", width: 58, height: 58, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, textDecoration: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", zIndex: 999 }}>💬</a>
      <a href="https://instagram.com" target="_blank" style={{ position: "fixed", bottom: 20, right: 20, background: "#E1306C", width: 58, height: 58, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, textDecoration: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", zIndex: 999 }}>📷</a>
    </div>
  );
}