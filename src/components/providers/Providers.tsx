'use client';

import { ReactNode } from 'react';
import { FontProvider } from './FontProvider';
import { RecaptchaProvider } from './RecaptchaProvider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <RecaptchaProvider>
      <FontProvider>
        {children}
      </FontProvider>
    </RecaptchaProvider>
  );
}

export default Providers;
