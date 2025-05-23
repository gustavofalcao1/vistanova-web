import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import WebVitals from "@/components/analytics/web-vitals";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vista Nova - Especialista em intermediação de crédito",
  description: "Especialista em intermediação de crédito",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={inter.className}>
      <body className="antialiased">
        <Providers>{children}</Providers>
        {/* Performance monitoring - only active in production */}
        <WebVitals />
      </body>
    </html>
  );
}
