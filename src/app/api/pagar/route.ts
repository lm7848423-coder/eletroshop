import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { total } = await req.json();
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) return NextResponse.json({ error: "SEM TOKEN" }, { status: 500 });
  const r = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      items: [{ title: "Pedido Eletroshop", quantity: 1, unit_price: Number(total), currency_id: "BRL" }],
      back_urls: { success: "https://eletroshop-three.vercel.app/", failure: "https://eletroshop-three.vercel.app/carrinho", pending: "https://eletroshop-three.vercel.app/carrinho" },
      auto_return: "approved",
    }),
  });
  const data = await r.json();
  return NextResponse.json({ init_point: data.init_point });
}