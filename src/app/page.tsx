"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

const WHATSAPP = "5599984806628";
const INSTAGRAM = "https://instagram.com/eletroshop_itz";
const FRETE_FIXO = 10.00;

const produtosBase = [
  { id: 1, nome: "Carregador USB-C 30W Turbo", preco: 59.90, img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500", tag: "30% OFF", cor: "#ff3b30" },
  { id: 2, nome: "Cabo USB-C 1m Nylon", preco: 19.90, img: "https://images.unsplash.com/photo-1629131726692-a0f23e7a5cbd?w=500", tag: "Novo", cor: "#0a84ff" },
  { id: 3, nome: "Fone Bluetooth TWS com Case", preco: 149.90, img: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500", tag: "Mais vendido", cor: "#34c759" },
  { id: 4, nome: "Capinha iPhone 15 MagSafe", preco: 39.90, img: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500", tag: "Top", cor: "#ffcc00" },
  { id: 5, nome: "Power Bank 10000mAh 22.5W", preco: 89.90, img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500", tag: "15% OFF", cor: "#ff3b30" },
  { id: 6, nome: "Headphone Wireless Bluetooth", preco: 229.90, img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500", tag: "Frete Grátis", cor: "#0a84ff" },
];

export default function Home() {
  const router = useRouter();
  const [produtos, setProdutos] = useState<any[]>(produtosBase);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    supabase.from("produtos").select("*").then(({ data }) => {
      if (data && data.length > 0) setProdutos(data);
    });
  }, []);

  const addCarrinho = (p: any) => {
    const atual = JSON.parse(localStorage.getItem("carrinho") || "[]");
    atual.push({ ...p, qtd: 1 });
    localStorage.setItem("carrinho", JSON.stringify(atual));
    router.push("/carrinho");
  };

  const filtrados = produtos.filter((p: any) => p.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div style={{ background: "#f5f5f7", minHeight: "100vh", fontFamily: "system-ui" }}>
      <header style={{ background: "white", height: 68, display: "flex", alignItems: "center", padding: "0 24px", justifyContent: "space-between", borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, zIndex: 100 }}>
        <img src="/logo.png" alt="ELETROSHOP" style={{ height: 32 }} />
        <div style={{ flex: 1, maxWidth: 560, margin: "0 24px" }}>
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar carregadores, cabos, fones..." style={{ width: "100%", height: 40, borderRadius: 999, border: "1px solid #d2d2d7", background: "#f5f5f7", padding: "0 16px", fontSize: 13 }} />
        </div>
        <a href="/carrinho" style={{ textDecoration: "none", color: "#1d1d1f", fontSize: 11, fontWeight: 700 }}>Carrinho</a>
      </header>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: 20 }}>
        <div style={{ background: "linear-gradient(90deg,#0a84ff 0%, #00d1b2 100%)", borderRadius: 14, padding: "24px 28px", color: "white" }}>
          <div style={{ fontSize: 24, fontWeight: 900 }}>Ofertas em Eletrônicos</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Até 30% OFF + Frete fixo R$ 10 Imperatriz</div>
        </div>

        <div style={{ marginTop: 20, fontWeight: 700, fontSize: 16 }}>Produtos em Destaque - Clique para comprar</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginTop: 12 }}>
          {filtrados.map((p:any)=>(
            <div key={p.id} onClick={()=>addCarrinho(p)} style={{ background: "white", borderRadius: 12, padding: 12, border: "1px solid #e5e5e5", cursor: "pointer", position: "relative" }}>
              <div style={{ position: "absolute", top: 8, left: 8, background: p.cor, color: "white", fontSize: 10, fontWeight: 800, padding: "3px 7px", borderRadius: 6 }}>{p.tag}</div>
              <img src={p.img || p.imagem_url} style={{ width: "100%", height: 110, objectFit: "contain", marginTop: 10 }} />
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 8, height: 30 }}>{p.nome}</div>
              <div style={{ color: "#0a84ff", fontWeight: 800, fontSize: 15, marginTop: 6 }}>R$ {Number(p.preco).toFixed(2)}</div>
              <div style={{ marginTop: 8, background: "#1d1d1f", color: "white", textAlign: "center", padding: "6px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>Comprar</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}