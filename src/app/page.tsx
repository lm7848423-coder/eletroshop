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

  const filtrados = produtos.filter((p: any) => 
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const whatsapp = "5599999999999"; // <-- COLOCA SEU NUMERO AQUI
  const instagram = "https://instagram.com/eletroshop.itz";

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* HEADER */}
      <header className="bg-[#FFE600] shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-black text-[#FFE600] w-9 h-9 rounded flex items-center justify-center font-black text-lg">E</div>
            <div>
              <div className="font-black text-black leading-none">ELETROSHOP</div>
              <div className="text-[10px] font-bold text-black">IMPERATRIZ E DAVINÓPOLIS</div>
            </div>
          </div>
          <div className="flex-1 max-w-2xl mx-auto">
            <input 
              value={busca} 
              onChange={e=>setBusca(e.target.value)} 
              placeholder="Buscar celular, fone, carregador..." 
              className="w-full px-4 py-2.5 rounded-full bg-white text-black placeholder-gray-500 outline-none shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <a href={instagram} target="_blank" className="bg-white text-black px-3 py-2 rounded-full font-bold text-sm shadow">📷 Instagram</a>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" className="bg-black text-white px-4 py-2 rounded-full font-bold text-sm">🛒 Carrinho</a>
          </div>
        </div>
      </header>

      {/* SUB HEADER */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex gap-2 text-[12px]">
        <span className="bg-white px-3 py-1.5 rounded-full shadow-sm text-black font-medium">📍 Entrega hoje em Imperatriz e Davinópolis - MA</span>
        <span className="bg-black text-[#FFE600] px-3 py-1.5 rounded-full font-bold">⚡ Entrega Rápida</span>
      </div>

      {/* CONTEUDO */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {filtrados.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="text-5xl mb-4">📱</div>
            <h2 className="text-2xl font-black text-black">Nosso catálogo está sendo atualizado</h2>
            <p className="text-gray-600 mt-2">Em breve muitos eletrônicos com entrega rápida em Imperatriz!</p>
            <div className="mt-6 flex justify-center gap-3">
              <a href={`https://wa.me/${whatsapp}?text=Olá! Quero ver os produtos da Eletroshop`} target="_blank" className="bg-[#25D366] text-white px-8 py-3 rounded-full font-black">Falar no WhatsApp</a>
              <a href={instagram} target="_blank" className="bg-black text-white px-8 py-3 rounded-full font-bold">Ver no Instagram</a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtrados.map((p: any) => (
              <div key={p.id} className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition">
                <img src={p.imagem_url} alt={p.nome} className="w-full h-40 object-contain" />
                <h3 className="text-sm font-medium text-black mt-3 line-clamp-2 min-h-[40px]">{p.nome}</h3>
                <p className="text-xl font-black text-black mt-2">R$ {Number(p.preco).toFixed(2)}</p>
                <p className="text-xs text-green-600 font-bold mt-1">✓ Entrega hoje</p>
                <a href={`https://wa.me/${whatsapp}?text=Quero ${p.nome}`} target="_blank" className="mt-3 block bg-black text-[#FFE600] text-center py-2 rounded-full font-bold text-sm">Comprar no WhatsApp</a>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* WHATSAPP FLUTUANTE */}
      <a href={`https://wa.me/${whatsapp}?text=Olá! Vim pelo site da Eletroshop`} target="_blank" className="fixed bottom-5 right-5 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg z-50">💬</a>
    </div>
  );
}