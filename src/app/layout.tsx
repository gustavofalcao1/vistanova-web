import type { Metadata, Viewport } from "next";
import "./globals.css";
import WebVitals from "@/components/analytics/web-vitals";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { FontProvider } from "@/components/providers/FontProvider";

export const metadata: Metadata = {
  title: "Vista Nova - Especialista em intermediação de crédito",
  description: "Especialista em intermediação de crédito",
  metadataBase: new URL('https://vistanova.pt'),
  icons: {
    icon: [
      { url: '/assets/icons/favicon.ico', sizes: 'any' },
      { url: '/assets/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/icons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
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
        <link rel="shortcut icon" href="/assets/icons/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/assets/icons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/assets/icons/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" crossOrigin="use-credentials" />
        
        {/* Theme and color */}
        <meta name="theme-color" content="#0e454e" />
        <meta name="msapplication-TileColor" content="#0e454e" />
        <meta name="msapplication-TileImage" content="/assets/icons/mstile-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-square70x70logo" content="/assets/icons/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/assets/icons/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/assets/icons/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/assets/icons/mstile-310x310.png" />
        
        {/* PWA related */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Vista Nova" />
        
        {/* Humans */}
        <link rel="author" href="/humans.txt" type="text/plain" />
      </head>
      <body className="antialiased relative">
        <FontProvider>
          <div style={{ minHeight: '100vh' }}>
            {children}
            <WhatsAppButton />
            {/* Performance monitoring - only active in production */}
            <WebVitals />
          </div>
        </FontProvider>
      </body>
    </html>
  );
}
