import type { Metadata, Viewport } from "next";
import "./globals.css";
import WebVitals from "@/components/analytics/web-vitals";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import Providers from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "Vista Nova - Especialista em intermediação de crédito",
  description: "Especialista em intermediação de crédito",
  metadataBase: new URL('https://vistanova.pt'),
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vista Nova',
  },
  manifest: '/site.webmanifest',
  themeColor: '#2563eb',
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
        
        {/* Favicons */}
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" crossOrigin="use-credentials" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#2563eb" />
        
        {/* Theme and color */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-TileImage" content="/favicon/favicon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-square70x70logo" content="/favicon/favicon-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/favicon/favicon-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/favicon/favicon-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/favicon/favicon-310x310.png" />
        
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
            {/* Performance monitoring - only active in production */}
            <WebVitals />
          </div>
        </Providers>
      </body>
    </html>
  );
}
