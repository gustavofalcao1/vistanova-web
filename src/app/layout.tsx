import type { Metadata, Viewport } from "next";
import "./globals.css";
import WebVitals from "@/components/analytics/web-vitals";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/providers/Providers";
import { getFaviconMetadata } from "@/components/seo";

export const metadata: Metadata = {
  ...getFaviconMetadata(),
  title: "Vista Nova - Especialista em intermediação de crédito",
  description: "Especialista em intermediação de crédito",
  metadataBase: new URL('https://vistanova.pt'),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vista Nova',
  },
  // Configurações de favicon e tema movidas para getFaviconMetadata()
  openGraph: {
    title: 'Vista Nova - Especialista em intermediação de crédito',
    description: 'Especialista em intermediação de crédito',
    url: 'https://vistanova.pt',
    siteName: 'Vista Nova',
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vista Nova - Especialista em intermediação de crédito',
    description: 'Especialista em intermediação de crédito',
  },
};

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="font-sans">
      <head>
        {/* Preload critical font weights */}
        <link
          rel="preload"
          href="/fonts/Inter-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Inter-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Theme and color - Configurações de tema e cor */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* PWA related */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Vista Nova" />
        
        {/* Humans */}
        <link rel="author" href="/humans.txt" type="text/plain" />
      </head>
      <body className="antialiased relative">
        <Providers>
          <div style={{ minHeight: '100vh' }}>
            {children}
            <WhatsAppButton />
            <Toaster />
            {/* Performance monitoring - only active in production */}
            <WebVitals />
          </div>
        </Providers>
      </body>
    </html>
  );
}
