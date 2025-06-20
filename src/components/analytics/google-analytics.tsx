'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';

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
 * Only loads in production environment to avoid affecting development performance
 */
export function GoogleAnalytics() {
  const [isProduction, setIsProduction] = useState(false);
  const [currentHost, setCurrentHost] = useState('');
  const [gaId, setGaId] = useState('');

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
      
      // For secondary tracking, we'll use a custom approach
      // since the official component doesn't support multiple IDs directly
      if (isProduction && typeof window !== 'undefined') {
        const secondaryId = isVercelDomain 
          ? GA_IDS.MAIN_DOMAIN 
          : GA_IDS.VERCEL_DOMAIN;
          
        // Only add secondary tracking if we have a valid ID
        if (secondaryId) {
          // Add secondary tracking script manually
          // This will run after the primary tracking is set up by the NextGoogleAnalytics component
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
          
          // Add the script after a short delay to ensure the primary GA is loaded
          setTimeout(() => {
            document.head.appendChild(script);
          }, 1000);
        }
      }
    }
  }, [isProduction]);

  if (!isProduction || !gaId) {
    return null;
  }

  return <NextGoogleAnalytics gaId={gaId} />;
}

export default GoogleAnalytics;
