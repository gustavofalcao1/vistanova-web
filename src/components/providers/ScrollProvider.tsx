'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Inner component that uses hooks requiring suspense
function ScrollProviderInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const targetId = hash.substring(1);
    if (!targetId) return;

    // Function to attempt scrolling to the target element
    const tryScroll = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        return true;
      }
      return false;
    };

    // Try to scroll immediately
    if (tryScroll()) return;

    // If element not found, retry with a delay
    const retryInterval = setInterval(() => {
      if (tryScroll()) {
        clearInterval(retryInterval);
      }
    }, 150);

    // Clear the interval after 3 seconds (20 attempts)
    const timeout = setTimeout(() => {
      clearInterval(retryInterval);
    }, 3000);

    // Cleanup function
    return () => {
      clearInterval(retryInterval);
      clearTimeout(timeout);
    };
  }, [pathname, searchParams]); // Re-run when URL changes

  return <>{children}</>;
}

// Function to be used in the future for programmatic scrolling
// Currently referenced in other components
export const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth' });
  return element !== null;
};

// Wrapper with Suspense to prevent hydration errors
export function ScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <ScrollProviderInner>{children}</ScrollProviderInner>
    </Suspense>
  );
}
