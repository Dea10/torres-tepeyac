import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { proyecto } from "@/data/proyecto";
import SideNav from "@/components/ui/SideNav";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: proyecto.nombre,
  description: proyecto.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        <div className="flex h-screen w-screen overflow-hidden">
          <SideNav />
          <main className="flex-1 h-screen overflow-hidden relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
