'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';
import { ENV } from '@/config/env';

/**
 * Get Google Analytics Measurement IDs from environment variables
 * This function ensures the environment variables are properly accessed
 */
function getGAMeasurementIds() {
  return {
    // ID for main domain (vistanova.pt)
    MAIN_DOMAIN: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_MAIN,
    // ID for Vercel deployment URL
    VERCEL_DOMAIN: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_DEV
  };
}

/**
 * GoogleAnalytics component
 * Implements Google Analytics 4 tracking for both main domain and Vercel deployment URL
 * Uses the official Next.js third-parties integration
 * Integrates with Cookiebot for GDPR compliance
 * Only loads in production environment and when consent is given
 */
export function GoogleAnalytics() {
  const [isProduction, setIsProduction] = useState(false);
  const [currentHost, setCurrentHost] = useState('');
  const [gaId, setGaId] = useState('');
  const [hasStatisticsConsent, setHasStatisticsConsent] = useState(false);

  useEffect(() => {
    // Only enable in production
    setIsProduction(process.env.NODE_ENV === 'production');
    
    // Get current hostname to determine which GA ID to use
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      setCurrentHost(hostname);
      
      // Get measurement IDs from environment variables
      const GA_IDS = getGAMeasurementIds();
      
      // Validate that environment variables are set
      if (!GA_IDS.MAIN_DOMAIN || !GA_IDS.VERCEL_DOMAIN) {
        console.warn('Google Analytics: Missing GA4 measurement IDs in environment variables');
        return;
      }
      
      // Determine which measurement ID to use based on the hostname
      const isVercelDomain = hostname.includes('vercel.app');
      const primaryId = isVercelDomain 
        ? GA_IDS.VERCEL_DOMAIN 
        : GA_IDS.MAIN_DOMAIN;
      
      setGaId(primaryId);
    }
  }, []);

  useEffect(() => {
    // Handle Cookiebot integration
    const checkCookiebotConsent = () => {
      if (typeof window !== 'undefined' && window.Cookiebot) {
        // Check if statistics cookies are consented
        const consent = window.Cookiebot.consent.statistics;
        setHasStatisticsConsent(consent);
        
        if (consent && isProduction && gaId) {
          // Enable secondary tracking if consent is given
          const GA_IDS = getGAMeasurementIds();
          const isVercelDomain = currentHost.includes('vercel.app');
          const secondaryId = isVercelDomain 
            ? GA_IDS.MAIN_DOMAIN 
            : GA_IDS.VERCEL_DOMAIN;
            
          if (secondaryId) {
            // Add secondary tracking script manually
            const existingScript = document.getElementById('google-analytics-secondary');
            if (!existingScript) {
              const script = document.createElement('script');
              script.id = 'google-analytics-secondary';
              script.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('config', '${secondaryId}', {
                  page_path: window.location.pathname,
                  cookie_flags: 'SameSite=None;Secure',
                  groups: 'secondary'
                });
              `;
              script.async = true;
              document.head.appendChild(script);
            }
          }
        }
      } else if (!ENV.COOKIEBOT_ENABLED) {
        // If Cookiebot is disabled, enable analytics by default
        setHasStatisticsConsent(true);
      }
    };

    // Check consent on component mount
    checkCookiebotConsent();

    // Listen for Cookiebot consent changes
    const handleConsentReady = () => {
      checkCookiebotConsent();
    };

    const handleStatisticsEnabled = () => {
      setHasStatisticsConsent(true);
    };

    window.addEventListener('CookiebotOnConsentReady', handleConsentReady);
    window.addEventListener('cookiebot-statistics-enabled', handleStatisticsEnabled);
    
    return () => {
      window.removeEventListener('CookiebotOnConsentReady', handleConsentReady);
      window.removeEventListener('cookiebot-statistics-enabled', handleStatisticsEnabled);
    };
  }, [isProduction, gaId, currentHost]);

  // Only render if we have production environment, GA ID, and proper consent
  if (!isProduction || !gaId || (ENV.COOKIEBOT_ENABLED && !hasStatisticsConsent)) {
    return null;
  }

  return <NextGoogleAnalytics gaId={gaId} />;
}

export default GoogleAnalytics;
