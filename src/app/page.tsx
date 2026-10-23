"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

type Produto = {
  id: string;
  nome: string;
  preco: number;
  imagem_url: string;
  estoque: number;
};

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      const { data } = await supabase.from("produtos").select("*").order("created_at", { ascending: false });
      if (data) setProdutos(data);
      setLoading(false);
    }
    carregar();
  }, []);

  const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER AMARELO */}
      <header className="bg-[#FFE600] sticky top-0 z-50 p-3 shadow">
        <div className="max-w-6xl mx-auto flex gap-3 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-black text-yellow-400 w-8 h-8 flex items-center justify-center rounded font-black">E</div>
            <div className="leading-none">
              <div className="font-black text-black text-sm">ELETROSHOP</div>
              <div className="text-[9px] text-black">IMPERATRIZ E DAVINÓPOLIS</div>
            </div>
          </Link>
          <div className="flex-1 flex">
            <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar produtos..." className="w-full px-4 py-2 rounded-l-md outline-none" />
            <button className="bg-white px-3 rounded-r-md border-l">🔍</button>
          </div>
          <Link href="/carrinho" className="bg-black text-yellow-400 px-4 py-2 rounded-md text-sm font-bold">🛒 Carrinho (0)</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-3 flex gap-2 text-xs">
        <span className="bg-white px-3 py-1 rounded-full">📍 Entregamos em <b>Imperatriz e Davinópolis • MA</b></span>
        <span className="bg-white px-3 py-1 rounded-full">🛡️ @eletroshop.itz</span>
      </div>

      <main className="max-w-6xl mx-auto p-3">
        {loading ? <p className="text-center mt-20">Carregando produtos...</p> :
         filtrados.length === 0 ? (
          <div className="text-center mt-20 bg-white p-10 rounded-xl">
            <p className="text-lg font-bold">Nenhum produto encontrado</p>
            <p className="text-sm text-gray-500 mt-2">Cadastre produtos em /admin</p>
            <Link href="/admin" className="text-xs text-gray-400 mt-4 block">Acesso lojista</Link>
          </div>
         ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {filtrados.map(p=>(
              <div key={p.id} className="bg-white rounded-xl p-3 shadow-sm">
                <img src={p.imagem_url} alt={p.nome} className="w-full h-32 object-contain" />
                <h3 className="text-sm mt-2 line-clamp-2">{p.nome}</h3>
                <p className="font-black text-lg mt-1">R$ {Number(p.preco).toFixed(2)}</p>
                <p className="text-[11px] text-green-600">{p.estoque > 0 ? "Em estoque" : "Sem estoque"}</p>
              </div>
            ))}
          </div>
         )
        }
      </main>
    </div>
  );
}