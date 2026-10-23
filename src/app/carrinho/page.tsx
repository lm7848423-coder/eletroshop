"use client";
import { useEffect, useState } from "react";

const FRETE_FIXO = 10.00;

export default function CarrinhoPage() {
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const salvo = JSON.parse(localStorage.getItem("carrinho") || "[]");
    setCarrinho(salvo);
  }, []);

  const totalProdutos = carrinho.reduce((acc, p) => acc + Number(p.preco), 0);
  const total = totalProdutos + FRETE_FIXO;

  const remover = (index: number) => {
    const novo = carrinho.filter((_, i) => i !== index);
    setCarrinho(novo);
    localStorage.setItem("carrinho", JSON.stringify(novo));
  };

  const pagar = async () => {
    if (carrinho.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/pagar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total, produtos: carrinho }),
      });
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Erro ao gerar pagamento: " + JSON.stringify(data));
        setLoading(false);
      }
    } catch (e) {
      alert("Erro de conexão");
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f5f5f7", minHeight: "100vh", fontFamily: "system-ui", padding: 20 }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <a href="/" style={{ textDecoration: "none", color: "#0a84ff", fontWeight: 600, fontSize: 13 }}>← Voltar pra loja</a>
        
        <h1 style={{ fontWeight: 900, fontSize: 28, marginTop: 16, color: "#1d1d1f" }}>Seu Carrinho ({carrinho.length})</h1>

        {carrinho.length === 0 && (
          <div style={{ background: "white", padding: 40, borderRadius: 16, textAlign: "center", marginTop: 20 }}>
            <p style={{ fontWeight: 600 }}>Seu carrinho está vazio</p>
            <a href="/" style={{ display: "inline-block", marginTop: 12, background: "#1d1d1f", color: "white", padding: "10px 20px", borderRadius: 20, textDecoration: "none", fontWeight: 700 }}>Ver produtos</a>
          </div>
        )}

        {carrinho.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 14, background: "white", padding: 14, borderRadius: 14, marginTop: 12, alignItems: "center", border: "1px solid #e5e5e5" }}>
            <img src={p.img || p.imagem_url} style={{ width: 70, height: 70, objectFit: "contain", background: "#f5f5f7", borderRadius: 10 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#1d1d1f" }}>{p.nome}</div>
              <div style={{ color: "#0a84ff", fontWeight: 800, fontSize: 15, marginTop: 4 }}>R$ {Number(p.preco).toFixed(2)}</div>
            </div>
            <button onClick={() => remover(i)} style={{ color: "#ff3b30", background: "#fff1f0", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>Remover</button>
          </div>
        ))}

        {carrinho.length > 0 && (
          <div style={{ background: "white", padding: 20, borderRadius: 16, marginTop: 20, border: "1px solid #e5e5e5" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6e6e73" }}><span>Subtotal produtos</span><span>R$ {totalProdutos.toFixed(2)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6e6e73", marginTop: 8 }}><span>Frete fixo Imperatriz</span><span>R$ {FRETE_FIXO.toFixed(2)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: 20, marginTop: 14, borderTop: "1px solid #e5e5e5", paddingTop: 14 }}><span>Total</span><span>R$ {total.toFixed(2)}</span></div>
            
            <button onClick={pagar} disabled={loading} style={{ width: "100%", marginTop: 18, background: "#009ee3", color: "white", padding: 16, borderRadius: 12, fontWeight: 900, border: "none", cursor: "pointer", fontSize: 15 }}>
              {loading ? "Gerando PIX..." : "PAGAR COM PIX / CARTÃO"}
            </button>
            <div style={{ textAlign: "center", fontSize: 11, color: "#6e6e73", marginTop: 10 }}>Pagamento seguro via Mercado Pago</div>
          </div>
        )}
      </div>
    </div>
  );
}