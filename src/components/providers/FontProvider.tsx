'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * FontProvider component that handles font loading and preloading
 * This ensures fonts are loaded efficiently and with proper fallbacks
 */
export function FontProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Preload fonts on initial load
  useEffect(() => {
    // Preload all font weights
    const preloadFonts = [
      { url: '/fonts/Inter-Regular.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { url: '/fonts/Inter-Medium.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { url: '/fonts/Inter-SemiBold.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { url: '/fonts/Inter-Bold.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    ];

    preloadFonts.forEach((font) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font.url;
      link.as = font.as;
      link.type = font.type;
      link.crossOrigin = font.crossOrigin;
      document.head.appendChild(link);
    });

    // Add font-display: swap to all @font-face rules
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        src: url('/fonts/Inter-Regular.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Inter';
        src: url('/fonts/Inter-Medium.woff2') format('woff2');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Inter';
        src: url('/fonts/Inter-SemiBold.woff2') format('woff2');
        font-weight: 600;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Inter';
        src: url('/fonts/Inter-Bold.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup
      document.head.removeChild(style);
    };
  }, [pathname]);

  return <>{children}</>;
}
