'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { ENV } from '@/config/env';

declare global {
  interface Window {
    UC_UI?: {
      showFirstLayer(): void;
      showSecondLayer(): void;
      acceptAllConsents(): void;
      denyAllConsents(): void;
    };
    ucEvent?: {
      SERVICES_FIRST_ACCEPTED: string;
      SERVICES_FIRST_DENIED: string;
      SERVICES_UPDATED: string;
    };
  }
}

export default function Usercentrics() {
  // Listen for Usercentrics consent changes
  useEffect(() => {
    const handleConsentChange = (event: any) => {
      // Check for specific services (Google Analytics, etc.)
      if (event.detail && event.detail.consents) {
        const consents = event.detail.consents;
        
        // Trigger custom events based on consent
        const hasAnalyticsConsent = consents.some((consent: any) => 
          consent.templateId === 'google-analytics' && consent.status === true
        );
        
        if (hasAnalyticsConsent) {
          window.dispatchEvent(new CustomEvent('usercentrics-analytics-enabled'));
        }
      }
    };

    // Add event listeners for Usercentrics events
    window.addEventListener('ucEvent', handleConsentChange);
    
    return () => {
      window.removeEventListener('ucEvent', handleConsentChange);
    };
  }, []);

  // Only render if enabled and we have a settings ID
  if (!ENV.USERCENTRICS_ENABLED || !ENV.USERCENTRICS_SETTINGS_ID) {
    return null;
  }

  const handleUsercentricsLoad = () => {
    // Usercentrics loaded successfully - no debug logs in production
  };

  const handleUsercentricsError = () => {
    // Handle error silently in production
  };

  return (
    <>
      {/* Usercentrics Autoblocker */}
      <Script
        id="usercentrics-autoblocker"
        src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"
        strategy="beforeInteractive"
      />
      
      {/* Usercentrics CMP */}
      <Script
        id="usercentrics-cmp"
        src="https://web.cmp.usercentrics.eu/ui/loader.js"
        data-settings-id={ENV.USERCENTRICS_SETTINGS_ID}
        strategy="afterInteractive"
        async
        onLoad={handleUsercentricsLoad}
        onError={handleUsercentricsError}
      />
    </>
  );
} 