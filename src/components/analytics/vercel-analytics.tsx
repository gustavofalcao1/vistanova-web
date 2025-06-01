'use client';

import { Analytics } from '@vercel/analytics/next';
import { useEffect, useState } from 'react';

/**
 * VercelAnalytics component
 * Implements Vercel Analytics tracking
 * Only loads in production environment to avoid affecting development performance
 */
export function VercelAnalytics() {
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    // Only enable in production
    setIsProduction(process.env.NODE_ENV === 'production');
  }, []);

  if (!isProduction) {
    return null;
  }

  return <Analytics />;
}

export default VercelAnalytics;
