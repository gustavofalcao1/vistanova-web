'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { ENV } from '@/config/env';

declare global {
  interface Window {
    Cookiebot?: {
      consent: {
        necessary: boolean;
        preferences: boolean;
        statistics: boolean;
        marketing: boolean;
      };
      show(): void;
      hide(): void;
      renew(): void;
    };
  }
}

export default function Cookiebot() {
  // Debug logs for development - Must be called before early return
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🍪 Cookiebot Debug Info:');
      console.log('- Enabled:', ENV.COOKIEBOT_ENABLED);
      console.log('- Domain ID:', ENV.COOKIEBOT_DOMAIN_ID);
      console.log('- Current hostname:', typeof window !== 'undefined' ? window.location.hostname : 'N/A');
    }
  }, []);

  // Add a reset button for development - Must be called before early return
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      const resetBtn = () => {
        localStorage.removeItem('dev-cookiebot-consent');
        console.log('🍪 [DEV] Consent reset');
      };
      (window as any).resetCookieConsent = resetBtn;
      console.log('🍪 [DEV] Use window.resetCookieConsent() to reset consent');
    }
  }, []);

  // Listen for Cookiebot consent changes - Must be called before early return
  useEffect(() => {
    const handleConsentChange = () => {
      if (typeof window !== 'undefined' && window.Cookiebot) {
        const consent = window.Cookiebot.consent;
        
        console.log('🍪 Consent changed:', consent);
        
        // Trigger custom events based on consent
        if (consent.statistics) {
          // Enable Google Analytics if statistics cookies are accepted
          window.dispatchEvent(new CustomEvent('cookiebot-statistics-enabled'));
        }
        
        if (consent.marketing) {
          // Enable marketing tools if marketing cookies are accepted
          window.dispatchEvent(new CustomEvent('cookiebot-marketing-enabled'));
        }
      }
    };

    // Add event listener for consent changes
    window.addEventListener('CookiebotOnConsentReady', handleConsentChange);
    
    return () => {
      window.removeEventListener('CookiebotOnConsentReady', handleConsentChange);
    };
  }, []);

  // Only render if Cookiebot is enabled and we have a domain ID
  if (!ENV.COOKIEBOT_ENABLED || !ENV.COOKIEBOT_DOMAIN_ID) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('🍪 Cookiebot not loaded:', {
        enabled: ENV.COOKIEBOT_ENABLED,
        hasDomainId: !!ENV.COOKIEBOT_DOMAIN_ID,
        domainId: ENV.COOKIEBOT_DOMAIN_ID || 'NOT_SET'
      });
    }
    return null;
  }

  const handleCookiebotLoad = () => {
    // Cookiebot loaded successfully
    if (typeof window !== 'undefined' && window.Cookiebot) {
      console.info('🍪 Cookiebot loaded successfully');
    }
  };

  const handleCookiebotError = (error: any) => {
    console.error('🍪 Failed to load Cookiebot:', error);
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        console.warn('🍪 Note: Cookiebot may not work properly on localhost. Try using a local domain or deploy to test properly.');
      }
    }
  };

  return (
    <>
      {/* Cookiebot Declaration Script */}
      <Script
        id="cookiebot-declaration"
        src={`https://consent.cookiebot.com/uc.js`}
        data-cbid={ENV.COOKIEBOT_DOMAIN_ID}
        data-blockingmode="auto"
        type="text/javascript"
        strategy="afterInteractive"
        onLoad={handleCookiebotLoad}
        onError={handleCookiebotError}
      />
    </>
  );
} 