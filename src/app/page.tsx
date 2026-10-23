"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function Home() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      const { data } = await supabase.from("produtos").select("*");
      if (data) setProdutos(data);
      setLoading(false);
    }
    carregar();
  }, []);

  const filtrados = produtos.filter((p: any) => 
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#EBEBEB]">
      <header className="bg-[#FFE600] sticky top-0 z-50 p-3 shadow">
        <div className="max-w-6xl mx-auto flex gap-3 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-black text-[#FFE600] w-8 h-8 flex items-center justify-center rounded font-black">E</div>
            <div className="leading-none">
              <div className="font-black text-black text-sm">ELETROSHOP</div>
              <div className="text-[9px] text-black font-bold">IMPERATRIZ E DAVINÓPOLIS</div>
            </div>
          </Link>
          <div className="flex-1 flex">
            <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar produtos..." className="w-full px-4 py-2 rounded-l-md outline-none text-black placeholder:text-gray-600 bg-white" />
            <button className="bg-white px-3 rounded-r-md border-l text-black">🔍</button>
          </div>
          <Link href="/carrinho" className="bg-black text-[#FFE600] px-4 py-2 rounded-md text-sm font-bold">Carrinho (0)</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-3 flex gap-2 text-xs">
        <span className="bg-white px-3 py-2 rounded-full text-black font-bold border">📍 Entregamos em <b>Imperatriz e Davinópolis • MA</b></span>
        <span className="bg-white px-3 py-2 rounded-full text-black font-bold border">🛡️ @eletroshop.itz</span>
      </div>

      <main className="max-w-6xl mx-auto p-3">
        {loading && <p className="text-center mt-20 text-black font-bold text-lg">Carregando produtos...</p>}
        
        {!loading && filtrados.length === 0 && (
          <div className="text-center mt-20 bg-white p-10 rounded-xl border shadow">
            <p className="text-xl font-black text-black">Nenhum produto encontrado</p>
            <p className="text-sm text-black font-bold mt-2">Cadastre produtos em /admin</p>
            <p className="text-sm text-gray-600 mt-1">Seu site está no ar, só falta produto!</p>
          </div>
        )}

        {!loading && filtrados.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filtrados.map((p: any) => (
              <div key={p.id} className="bg-white rounded-xl p-3 shadow border">
                <img src={p.imagem_url} alt={p.nome} className="w-full h-32 object-contain" />
                <h3 className="text-sm mt-2 text-black font-bold">{p.nome}</h3>
                <p className="font-black text-lg mt-1 text-black">R$ {Number(p.preco).toFixed(2)}</p>
                <p className="text-[11px] text-green-700 font-bold">{p.estoque > 0 ? "Em estoque" : "Sem estoque"}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}