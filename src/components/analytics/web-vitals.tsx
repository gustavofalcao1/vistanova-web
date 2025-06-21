'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { useEffect, useState } from 'react';

/**
 * Web Vitals component for monitoring performance metrics
 * Only loads in production environment to avoid affecting development performance
 */
export function WebVitals() {
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    // Only enable in production
    setIsProduction(process.env.NODE_ENV === 'production');
  }, []);

  // Only report web vitals in production
  useReportWebVitals((metric) => {
    // Only report in production
    if (process.env.NODE_ENV === 'production') {
      // Send to analytics service
      // You can integrate with your preferred analytics service here
    }
  });

  // This component doesn't render anything
  return null;
}

export default WebVitals;
