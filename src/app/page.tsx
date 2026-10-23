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
  const whatsapp = "5599999999999"; // TROCA PELO SEU

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* BANNER COM SUA LOGO NOVA */}
      <header 
        className="relative h-[180px] md:h-[240px] bg-black bg-cover bg-center"
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-between py-3">
          <div className="flex justify-between items-center">
            <Link href="/carrinho" className="bg-[#FFE600] text-black px-4 py-2 rounded-full font-black text-sm shadow">🛒 Carrinho (0)</Link>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" className="bg-[#25D366] text-white px-4 py-2 rounded-full font-bold text-sm">WhatsApp</a>
          </div>
          <div className="max-w-xl">
            <input 
              value={busca} 
              onChange={e=>setBusca(e.target.value)} 
              placeholder="Buscar capinha, carregador, película..." 
              className="w-full px-5 py-3 rounded-full bg-white text-black placeholder-gray-500 outline-none shadow-lg font-medium"
            />
          </div>
        </div>
      </header>

      <div className="bg-[#FFE600] text-black text-center py-1.5 text-xs font-black">📍 ENTREGA HOJE EM IMPERATRIZ E DAVINÓPOLIS - MA | ⚡ ENTREGA RÁPIDA</div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {filtrados.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <h2 className="text-xl font-black text-black">Em breve muitas ofertas! 🔌</h2>
            <p className="text-gray-600 mt-1 text-sm">Capinhas, carregadores, películas e muito mais.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filtrados.map((p: any) => (
              <div key={p.id} className="bg-white rounded-2xl p-3 shadow-sm">
                <img src={p.imagem_url} className="w-full h-40 object-contain" />
                <h3 className="text-sm font-bold text-black mt-2">{p.nome}</h3>
                <p className="text-lg font-black text-black">R$ {Number(p.preco).toFixed(2)}</p>
                <a href={`https://wa.me/${whatsapp}?text=Quero ${p.nome}`} target="_blank" className="mt-2 block bg-black text-[#FFE600] text-center py-2 rounded-full font-bold text-sm">Comprar</a>
              </div>
            ))}
          </div>
        )}
      </main>

      <a href={`https://wa.me/${whatsapp}`} target="_blank" className="fixed bottom-5 right-5 bg-[#25D366] w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl z-50">💬</a>
    </div>
  );
}