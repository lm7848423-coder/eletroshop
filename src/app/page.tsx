"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [produtos, setProdutos] = useState<any[]>(produtosBase);
  const [busca, setBusca] = useState("");
  const [cat, setCat] = useState("Eletrônicos");

  useEffect(() => {
    supabase.from("produtos").select("*").then(({ data, error }) => {
      console.log("Supabase produtos:", data, error);
      if (data && data.length > 0) setProdutos(data);
    });
  }, []);

  const addCarrinho = (p: any) => {
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho") || "[]");
    carrinhoAtual.push({ ...p, qtd: 1 });
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
    router.push("/carrinho");
  };

  const filtrados = produtos.filter((p: any) => p.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div style={{ background: "#f5f5f7", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <header style={{ background: "white", height: 68, display: "flex", alignItems: "center", padding: "0 24px", justifyContent: "space-between", borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="ELETROSHOP" style={{ height: 32, objectFit: "contain" }} />
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

        <main style={{ flex: 1 }}>
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

          <div id="produtos" style={{ marginTop: 20, fontWeight: 700, fontSize: 16 }}>Produtos em Destaque - Clique para comprar</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginTop: 12 }}>
            {filtrados.map((p:any)=>(
              <div key={p.id} onClick={() => addCarrinho(p)} style={{ background: "white", borderRadius: 12, padding: 12, border: "1px solid #e5e5e5", position: "relative", cursor: "pointer" }}>
                <div style={{ position: "absolute", top: 8, left: 8, background: p.cor || "#0a84ff", color: p.cor==="#ffcc00"?"black":"white", fontSize: 10, fontWeight: 800, padding: "3px 7px", borderRadius: 6 }}>{p.tag || "Novo"}</div>
                <img src={p.img || p.imagem_url || p.imagem} style={{ width: "100%", height: 110, objectFit: "contain", marginTop: 10 }} />
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 8, height: 30, overflow: "hidden", color: "#1d1d1f" }}>{p.nome}</div>
                <div style={{ color: "#0a84ff", fontWeight: 800, fontSize: 15, marginTop: 6 }}>R$ {Number(p.preco).toFixed(2).replace(".",",")}</div>
                <div style={{ fontSize: 11, color: "#666" }}>+ R$ {FRETE_FIXO.toFixed(2).replace(".",",")} frete fixo</div>
                <div style={{ marginTop: 8, background: "#1d1d1f", color: "white", textAlign: "center", padding: "6px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>Comprar</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";

const FRETE_FIXO = 10;

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCarrinho(JSON.parse(localStorage.getItem("carrinho") || "[]"));
  }, []);

  const totalProdutos = carrinho.reduce((acc, p) => acc + Number(p.preco), 0);
  const total = totalProdutos + FRETE_FIXO;

  const pagar = async () => {
    setLoading(true);
    const res = await fetch("/api/pagar", {
      method: "POST",
      body: JSON.stringify({ total, produtos: carrinho }),
    });
    const data = await res.json();
    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      alert("Erro: " + JSON.stringify(data));
      setLoading(false);
    }
  };

  const remover = (index: number) => {
    const novo = carrinho.filter((_, i) => i !== index);
    setCarrinho(novo);
    localStorage.setItem("carrinho", JSON.stringify(novo));
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20, fontFamily: "system-ui" }}>
      <h1 style={{ fontWeight: 800 }}>Seu Carrinho ({carrinho.length})</h1>
      {carrinho.length === 0 && <p>Carrinho vazio. Volta pra loja!</p>}
      {carrinho.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 12, background: "white", padding: 12, borderRadius: 8, marginTop: 10, alignItems: "center" }}>
          <img src={p.img || p.imagem_url} style={{ width: 60, height: 60, objectFit: "contain" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{p.nome}</div>
            <div style={{ color: "#0a84ff", fontWeight: 800 }}>R$ {Number(p.preco).toFixed(2)}</div>
          </div>
          <button onClick={() => remover(i)} style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}>X</button>
        </div>
      ))}

      {carrinho.length > 0 && (
        <div style={{ background: "white", padding: 16, borderRadius: 12, marginTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Produtos:</span><span>R$ {totalProdutos.toFixed(2)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Frete fixo Imperatriz:</span><span>R$ {FRETE_FIXO.toFixed(2)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 18, marginTop: 10, borderTop: "1px solid #eee", paddingTop: 10 }}><span>Total:</span><span>R$ {total.toFixed(2)}</span></div>
          <button onClick={pagar} disabled={loading} style={{ width: "100%", marginTop: 16, background: "#009ee3", color: "white", padding: 14, borderRadius: 8, fontWeight: 800, border: "none", cursor: "pointer" }}>
            {loading ? "Gerando PIX..." : "Pagar com PIX / Cartão"}
          </button>
        </div>
      )}
    </div>
  );
}