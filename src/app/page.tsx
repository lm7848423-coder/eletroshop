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

  return (
    <div style={{ minHeight: "100vh", background: "#EBEBEB" }}>
      <header style={{ background: "#FFE600", padding: 12 }} className="sticky top-0 z-50 shadow">
        <div className="max-w-6xl mx-auto flex gap-3 items-center">
          <div style={{ background: "black", color: "#FFE600", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, fontWeight: 900 }}>E</div>
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontWeight: 900, color: "black", fontSize: 14 }}>ELETROSHOP</div>
            <div style={{ fontSize: 9, color: "black", fontWeight: 700 }}>IMPERATRIZ E DAVINOPOLIS</div>
          </div>
          <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar produtos..." style={{ flex: 1, padding: 10, borderRadius: 8, color: "black", background: "white" }} />
          <Link href="/carrinho" style={{ background: "black", color: "#FFE600", padding: "8px 16px", borderRadius: 8, fontWeight: 700, fontSize: 13 }}>Carrinho (0)</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-3">
        {filtrados.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: 80, background: "white", padding: 40, borderRadius: 16 }}>
            <p style={{ fontSize: 22, fontWeight: 900, color: "black" }}>Nenhum produto encontrado</p>
            <p style={{ fontSize: 14, color: "black", fontWeight: 700, marginTop: 8 }}>Seu site está no ar! Só falta cadastrar produtos em /admin</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filtrados.map((p: any) => (
              <div key={p.id} style={{ background: "white", borderRadius: 12, padding: 12 }}>
                <img src={p.imagem_url} alt={p.nome} style={{ width: "100%", height: 128, objectFit: "contain" }} />
                <h3 style={{ fontSize: 14, marginTop: 8, color: "black", fontWeight: 700 }}>{p.nome}</h3>
                <p style={{ fontWeight: 900, fontSize: 18, color: "black" }}>R$ {Number(p.preco).toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}