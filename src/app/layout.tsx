import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ELETROSHOP - Eletrônicos em Imperatriz e Davinópolis",
  description: "Loja de eletrônicos com entrega hoje em Imperatriz e Davinópolis - MA. Compra garantida, melhor preço da região.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "ELETROSHOP",
    description: "Entrega hoje em Imperatriz e Davinópolis",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}