// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Blox Fruits · Guia Definitivo",
  description: "Guia completo de Blox Fruits com todas as frutas, armas, acessórios, raças e muito mais",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}