import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header/navBar";

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
        <div className="flex-grow">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
