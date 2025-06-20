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
  // Debug logs
  useEffect(() => {
    console.log('🍪 Usercentrics Debug Info:');
    console.log('- Enabled:', ENV.COOKIEBOT_ENABLED);
    console.log('- Settings ID:', ENV.COOKIEBOT_DOMAIN_ID);
    console.log('- Settings ID Length:', ENV.COOKIEBOT_DOMAIN_ID?.length);
    console.log('- Current hostname:', typeof window !== 'undefined' ? window.location.hostname : 'N/A');
    console.log('- Environment:', process.env.NODE_ENV);
    
    // Check if Settings ID looks valid (Usercentrics uses longer IDs)
    if (ENV.COOKIEBOT_DOMAIN_ID) {
      const isValidFormat = /^[a-zA-Z0-9]{10,}$/.test(ENV.COOKIEBOT_DOMAIN_ID);
      console.log('- Settings ID Format Valid:', isValidFormat);
      if (!isValidFormat) {
        console.warn('🚨 Usercentrics Settings ID should be 10+ alphanumeric characters. Current:', ENV.COOKIEBOT_DOMAIN_ID);
      }
    }
  }, []);

  // Listen for Usercentrics consent changes
  useEffect(() => {
    const handleConsentChange = (event: any) => {
      console.log('🍪 Usercentrics consent changed:', event);
      
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
  if (!ENV.COOKIEBOT_ENABLED || !ENV.COOKIEBOT_DOMAIN_ID) {
    console.warn('🍪 Usercentrics not loaded:', {
      enabled: ENV.COOKIEBOT_ENABLED,
      hasSettingsId: !!ENV.COOKIEBOT_DOMAIN_ID,
      settingsId: ENV.COOKIEBOT_DOMAIN_ID || 'NOT_SET',
      reason: !ENV.COOKIEBOT_ENABLED ? 'Disabled' : 'Missing Settings ID'
    });
    return null;
  }

  const handleUsercentricsLoad = () => {
    if (typeof window !== 'undefined' && window.UC_UI) {
      console.info('✅ Usercentrics loaded successfully');
    } else {
      console.error('❌ Usercentrics script loaded but UC_UI not available');
    }
  };

  const handleUsercentricsError = (error: any) => {
    console.error('❌ Failed to load Usercentrics:', error);
    console.error('🔍 Debug info:', {
      settingsId: ENV.COOKIEBOT_DOMAIN_ID,
      hostname: typeof window !== 'undefined' ? window.location.hostname : 'N/A',
      isLocalhost: typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    });
  };

  console.log('🍪 Loading Usercentrics with Settings ID:', ENV.COOKIEBOT_DOMAIN_ID);

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
        data-settings-id={ENV.COOKIEBOT_DOMAIN_ID}
        strategy="afterInteractive"
        async
        onLoad={handleUsercentricsLoad}
        onError={handleUsercentricsError}
      />
    </>
  );
} 