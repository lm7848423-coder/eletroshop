import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ELETROSHOP - Eletrônicos em Imperatriz e Davinópolis",
  description: "Loja de eletrônicos com entrega hoje em Imperatriz e Davinópolis - MA",
  icons: { icon: "/favicon.ico" },
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