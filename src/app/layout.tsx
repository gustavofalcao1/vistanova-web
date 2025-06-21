import type { Metadata, Viewport } from "next";
import "./globals.css";
import WebVitals from "@/components/analytics/web-vitals";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import VercelAnalytics from "@/components/analytics/vercel-analytics";
import Usercentrics from "@/components/analytics/usercentrics";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/providers/Providers";
import { ScrollProvider } from "@/components/providers/ScrollProvider";
import { Favicon, getFaviconMetadata } from "@/components/seo";
import WhatsAppButton from "@/components/ui/whatsapp-button";

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
  themeColor: '#E5FC2A',
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
    <html lang="pt" className="font-sans" suppressHydrationWarning>
      <head>
        <Favicon />
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
        <link
          rel="preload"
          href="/fonts/Inter-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Inter-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Theme and color - Configurações de tema e cor */}
        <meta name="msapplication-TileColor" content="#E5FC2A" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* PWA related */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Vista Nova" />
        
        {/* Humans */}
        <link rel="author" href="/humans.txt" type="text/plain" />
      </head>
      {/* #DEV div and mt-12 */}
      <body className="antialiased relative">
        <div className="fixed flex items-center justify-center top-0 left-0 right-0 h-12 w-full z-[99] bg-secondary">
          <p className="text-primary font-bold text-xl">Web site em desenvolvimento</p>
        </div>
        <Providers>
          <ScrollProvider>
            <div style={{ minHeight: '100vh' }} className="mt-12">
              {children}
              <WhatsAppButton />
              <Toaster />
              {/* Cookie Consent Management - GDPR Compliance */}
              <Usercentrics />
              {/* Performance monitoring - only active in production */}
              <WebVitals />
              {/* Google Analytics - only active in production and with consent */}
              <GoogleAnalytics />
              {/* Vercel Analytics - only active in production */}
              <VercelAnalytics />
            </div>
          </ScrollProvider>
        </Providers>
      </body>
    </html>
  );
}
