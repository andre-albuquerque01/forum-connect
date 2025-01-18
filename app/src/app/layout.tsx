import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/nav/header";

export const metadata: Metadata = {
  title: "Node Forum",
  description: "Gerado para aplicação de um forum em node...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
