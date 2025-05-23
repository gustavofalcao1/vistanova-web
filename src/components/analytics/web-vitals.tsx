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
  useReportWebVitals(metric => {
    if (!isProduction) return;

    // Send metrics to your analytics service
    // This is a simple console log, but you can replace with your analytics service
    console.log(metric);

    // Example for sending to Google Analytics
    // Destructuring commented out to avoid lint errors until actually used
    // const { id, name, value, rating } = metric;
    
    // Send to analytics if you have a service set up
    // window.gtag?.('event', name, {
    //   event_category: 'Web Vitals',
    //   event_label: id,
    //   value: Math.round(name === 'CLS' ? value * 1000 : value),
    //   non_interaction: true,
    //   metric_rating: rating,
    // });
  });

  // This component doesn't render anything
  return null;
}

export default WebVitals;
