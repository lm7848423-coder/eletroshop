"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const WHATSAPP = "5599999999999";
const INSTAGRAM = "https://instagram.com/seuinstagram";

const produtosExemplo = [
  { id: 1, nome: "Carregador USB-C 30W - Rápido", preco: 59.90, imagem: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400", tag: "30% OFF", tagColor: "#ff5252", nota: "4.7 (128)" },
  { id: 2, nome: "Cabo USB-C 1m - Nylon Trançado", preco: 19.90, imagem: "https://images.unsplash.com/photo-1629131726692-a0f23e7a5cbd?w=400", tag: "Novo", tagColor: "#2196F3", nota: "4.9 (342)" },
  { id: 3, nome: "Fone de Ouvido Bluetooth TWS", preco: 149.90, imagem: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400", tag: "Mais vendido", tagColor: "#4CAF50", nota: "4.6 (1.024)" },
  { id: 4, nome: "Capinha iPhone 15 - Transparente MagSafe", preco: 39.90, imagem: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400", tag: "Top", tagColor: "#FFC107", nota: "4.5 (512)" },
  { id: 5, nome: "Power Bank 10000mAh - 22.5W", preco: 89.90, imagem: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400", tag: "15% OFF", tagColor: "#ff5252", nota: "4.6 (278)" },
  { id: 6, nome: "Headphone Wireless Bluetooth", preco: 229.90, imagem: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400", tag: "Frete Grátis", tagColor: "#2196F3", nota: "4.7 (401)" },
];

export default function Home() {
  const [produtos, setProdutos] = useState<any[]>(produtosExemplo);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Eletrônicos");

  useEffect(() => {
    supabase.from("produtos").select("*").then(({ data }) => {
      if (data && data.length > 0) setProdutos(data);
    });
  }, []);

  const filtrados = produtos.filter((p: any) => p.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div style={{ background: "#f2f2f2", minHeight: "100vh", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* HEADER BRANCO PROFISSIONAL */}
      <div style={{ background: "white", height: 72, display: "flex", alignItems: "center", padding: "0 24px", gap: 24, position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid #e5e5e5", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 180 }}>
          <div style={{ background: "#e3f2fd", width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>⚡</div>
          <span style={{ fontWeight: 900, fontSize: 20, color: "#0d2340", letterSpacing: -0.5 }}>ELETROSHOP</span>
        </div>

        <div style={{ flex: 1, maxWidth: 520, position: "relative" }}>
          <span style={{ position: "absolute", left: 14, top: 11, fontSize: 16 }}>🔍</span>
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar produtos: carregadores, cabos, fones, capinhas..." style={{ width: "100%", height: 42, borderRadius: 20, border: "1px solid #d0d0d0", padding: "0 16px 0 40px", background: "#f5f5f5", fontSize: 13, outline: "none" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 12, fontWeight: 700, color: "#333" }}>
          <div style={{ textAlign: "center", cursor: "pointer" }}><div style={{ fontSize: 18 }}>👤</div>Entrar</div>
          <div style={{ textAlign: "center", cursor: "pointer" }}><div style={{ fontSize: 18 }}>♡</div>Favoritos</div>
          <a href="/carrinho" style={{ textAlign: "center", textDecoration: "none", color: "#333", position: "relative" }}><div style={{ fontSize: 18 }}>🛒<span style={{ position: "absolute", top: -6, right: -6, background: "#2196F3", color: "white", fontSize: 10, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>3</span></div>Carrinho</a>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 20, padding: 20 }}>
        {/* LATERAL ESQUERDA */}
        <div style={{ width: 220, minWidth: 220 }}>
          <div style={{ background: "white", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12 }}>Categorias</div>
            {[
              ["⚡ Eletrônicos", "Eletrônicos"],
              ["🔌 Carregadores", "Carregadores"],
              ["🔗 Cabos", "Cabos"],
              ["🎧 Fones de Ouvido", "Fones"],
              ["📱 Capas para Celular", "Capas"],
              ["🔋 Power Banks", "Power Banks"],
              ["⌚ Smartwatches", "Smartwatches"],
              ["🎧 Acessórios", "Acessórios"],
            ].map(([label, val]) => (
              <div key={val} onClick={() => setCategoria(val)} style={{ padding: "8px 10px", borderRadius: 8, background: categoria === val ? "#e3f2fd" : "transparent", color: categoria === val ? "#1565c0" : "#333", fontSize: 13, fontWeight: categoria === val ? 700 : 500, cursor: "pointer", marginBottom: 4 }}>{label}</div>
            ))}
          </div>

          <div style={{ background: "white", borderRadius: 12, padding: 16, marginTop: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <div style={{ fontWeight: 800, fontSize: 14 }}>Filtrar por Preço</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, marginTop: 10 }}><span>R$ 20</span><span>R$ 500</span><span>R$ 300</span></div>
            <input type="range" style={{ width: "100%", marginTop: 4 }} />
            <div style={{ fontWeight: 800, fontSize: 14, marginTop: 20 }}>Marca</div>
            <div style={{ marginTop: 10, fontSize: 13, display: "flex", flexDirection: "column", gap: 8 }}>
              <label><input type="checkbox" defaultChecked /> Samsung</label>
              <label><input type="checkbox" /> Apple</label>
              <label><input type="checkbox" /> Xiaomi</label>
              <label><input type="checkbox" /> Anker</label>
            </div>
          </div>
        </div>

        {/* CENTRO */}
        <div style={{ flex: 1 }}>
          {/* BANNER AZUL OFERTAS */}
          <div style={{ background: "linear-gradient(90deg, #1e63ff 0%, #00c6b8 100%)", borderRadius: 16, padding: "22px 28px", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", overflow: "hidden" }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.1 }}>Ofertas em Eletrônicos</div>
              <div style={{ fontSize: 14, marginTop: 4, opacity: 0.9 }}>Até 30% OFF em carregadores e acessórios</div>
              <div style={{ marginTop: 12, background: "white", color: "#1e63ff", display: "inline-block", padding: "8px 16px", borderRadius: 8, fontWeight: 800, fontSize: 13, cursor: "pointer" }}>Comprar agora ›</div>
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: 50 }}>🎧🔌📱</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, marginBottom: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 17 }}>Produtos em Destaque</div>
            <div style={{ fontSize: 12, color: "#555" }}>12 resultados • Ordenar por: <b>Mais vendidos ⌄</b></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filtrados.map((p: any) => (
              <div key={p.id} style={{ background: "white", borderRadius: 12, padding: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", position: "relative", border: "1px solid #f0f0f0" }}>
                <div style={{ position: "absolute", top: 10, left: 10, background: p.tagColor || "#2196F3", color: p.tagColor === "#FFC107" ? "black" : "white", fontSize: 10, fontWeight: 800, padding: "3px 7px", borderRadius: 6 }}>{p.tag || "Novo"}</div>
                <img src={p.imagem || p.imagem_url} style={{ width: "100%", height: 120, objectFit: "contain", marginTop: 10 }} />
                <div style={{ fontSize: 12, fontWeight: 600, color: "#222", marginTop: 10, height: 32, overflow: "hidden" }}>{p.nome}</div>
                <div style={{ color: "#0d47a1", fontWeight: 900, fontSize: 15, marginTop: 6 }}>R$ {Number(p.preco).toFixed(2).replace(".", ",")}</div>
                <div style={{ fontSize: 11, color: "#666" }}>ou 6x de R$ {(Number(p.preco)/6).toFixed(2).replace(".", ",")} sem juros</div>
                <div style={{ fontSize: 11, color: "#ffb300", marginTop: 2 }}>★★★★☆ {p.nota || "4.7 (128)"}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", fontSize: 12, color: "#666", marginTop: 18 }}>Mostrando 1-6 de 12 produtos • Página 1 de 2 ‹ 1 2 ›</div>
        </div>
      </div>

      {/* BOTÕES FLUTUANTES IGUAL DA FOTO */}
      <div style={{ position: "fixed", right: 22, top: "50%", transform: "translateY(-20%)", display: "flex", flexDirection: "column", gap: 14, zIndex: 999 }}>
        <a href={INSTAGRAM} target="_blank" style={{ width: 62, height: 62, borderRadius: "50%", background: "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, color: "white", textDecoration: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>📸</a>
        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" style={{ width: 62, height: 62, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, color: "white", textDecoration: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>💬</a>
      </div>
    </div>
  );
}