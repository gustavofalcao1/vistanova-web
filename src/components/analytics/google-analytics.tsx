'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { ENV } from '@/config/env';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function GoogleAnalytics() {
  useEffect(() => {
    const handleAnalyticsEnabled = () => {
      // Enable Google Analytics when consent is given
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
    };

    // Listen for Usercentrics consent events
    window.addEventListener('usercentrics-analytics-enabled', handleAnalyticsEnabled);
    
    return () => {
      window.removeEventListener('usercentrics-analytics-enabled', handleAnalyticsEnabled);
    };
  }, []);

  // Don't load Google Analytics if no ID is provided
  if (!ENV.GOOGLE_ANALYTICS_ID) {
    return null;
  }

  const handleGALoad = () => {
    // Google Analytics loaded successfully
  };

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ENV.GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
        onLoad={handleGALoad}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Initialize with denied consent (GDPR compliance)
          gtag('consent', 'default', {
            analytics_storage: 'denied'
          });

          gtag('config', '${ENV.GOOGLE_ANALYTICS_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}
