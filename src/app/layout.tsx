import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WebVitals from "@/components/analytics/web-vitals";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vista Nova - Especialista em intermediação de crédito",
  description: "Especialista em intermediação de crédito",
};

console.log('RootLayout está sendo renderizado');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={inter.className}>
      <body className="antialiased relative">
        {/* Removendo temporariamente os providers para isolar o problema */}
        <div style={{ minHeight: '100vh' }}>
          {children}
          <WhatsAppButton />
          {/* Performance monitoring - only active in production */}
          <WebVitals />
        </div>
      </body>
    </html>
  );
}
