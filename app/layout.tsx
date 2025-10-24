import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JoxAI Admin Dashboard",
  description: "Dashboard administrativo del ecosistema JoxAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
