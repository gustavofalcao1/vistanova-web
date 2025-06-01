'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';

// Google Analytics Measurement IDs
const GA_MEASUREMENT_IDS = {
  // ID for main domain (vistanova.pt)
  MAIN_DOMAIN: 'G-CKS904F0K4',
  // ID for Vercel deployment URL
  VERCEL_DOMAIN: 'G-WN7H6JW57C'
};

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
      
      // Determine which measurement ID to use based on the hostname
      const isVercelDomain = hostname.includes('vercel.app');
      const primaryId = isVercelDomain 
        ? GA_MEASUREMENT_IDS.VERCEL_DOMAIN 
        : GA_MEASUREMENT_IDS.MAIN_DOMAIN;
      
      setGaId(primaryId);
      
      // For secondary tracking, we'll use a custom approach
      // since the official component doesn't support multiple IDs directly
      if (isProduction && typeof window !== 'undefined') {
        const secondaryId = isVercelDomain 
          ? GA_MEASUREMENT_IDS.MAIN_DOMAIN 
          : GA_MEASUREMENT_IDS.VERCEL_DOMAIN;
          
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
  }, [isProduction]);

  if (!isProduction || !gaId) {
    return null;
  }

  return <NextGoogleAnalytics gaId={gaId} />;
}

export default GoogleAnalytics;
