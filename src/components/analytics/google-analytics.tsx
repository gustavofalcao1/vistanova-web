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
    // Listen for Usercentrics consent changes
    const handleUsercentricsConsent = () => {
      console.log('🍪 Google Analytics enabled via Usercentrics consent');
      
      // Initialize Google Analytics when consent is given
      if (typeof window !== 'undefined' && window.gtag && ENV.GOOGLE_ANALYTICS_ID) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
        
        window.gtag('config', ENV.GOOGLE_ANALYTICS_ID, {
          page_title: document.title,
          page_location: window.location.href,
        });
      }
    };

    // Add event listener for Usercentrics analytics consent
    window.addEventListener('usercentrics-analytics-enabled', handleUsercentricsConsent);
    
    return () => {
      window.removeEventListener('usercentrics-analytics-enabled', handleUsercentricsConsent);
    };
  }, []);

  // Only render if we have a Google Analytics ID
  if (!ENV.GOOGLE_ANALYTICS_ID) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Google Analytics not loaded: Missing GOOGLE_ANALYTICS_ID');
    }
    return null;
  }

  const handleGtagLoad = () => {
    console.log('✅ Google Analytics script loaded');
    
    // Initialize with denied consent (Usercentrics will update when user consents)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        wait_for_update: 500,
      });
    }
  };

  return (
    <>
      {/* Google Analytics gtag script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ENV.GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
        onLoad={handleGtagLoad}
      />
      
      {/* Google Analytics initialization */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          
          // Initialize with denied consent - Usercentrics will update this
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            wait_for_update: 500,
          });
        `}
      </Script>
    </>
  );
}
