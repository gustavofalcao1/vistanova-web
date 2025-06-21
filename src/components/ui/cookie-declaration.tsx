'use client';

import { useEffect, useRef } from 'react';
import { ENV } from '@/config/env';

interface CookieDeclarationProps {
  /**
   * Language for the cookie declaration
   * @default 'pt'
   */
  lang?: string;
  /**
   * Custom CSS classes
   */
  className?: string;
}

/**
 * CookieDeclaration component
 * Displays the Usercentrics cookie declaration table
 * This component should be used in the cookie policy page
 */
export default function CookieDeclaration({ 
  lang = 'pt', 
  className = '' 
}: CookieDeclarationProps) {
  const declarationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only proceed if Usercentrics is enabled and we have a settings ID
    if (!ENV.USERCENTRICS_ENABLED || !ENV.USERCENTRICS_SETTINGS_ID) {
      return;
    }

    const loadDeclaration = () => {
      if (declarationRef.current && typeof window !== 'undefined') {
        // Clear any existing content
        declarationRef.current.innerHTML = '';
        
        // Create the Usercentrics declaration script
        const script = document.createElement('script');
        script.id = 'UsercentricsCookieDeclaration';
        script.type = 'text/javascript';
        script.async = true;
        script.src = `https://web.cmp.usercentrics.eu/ui/loader.js`;
        script.setAttribute('data-settings-id', ENV.USERCENTRICS_SETTINGS_ID);
        
        // Set the language if different from default
        if (lang !== 'pt') {
          script.setAttribute('data-language', lang);
        }
        
        declarationRef.current.appendChild(script);
      }
    };

    // Load the declaration when component mounts
    loadDeclaration();

    // Reload if Usercentrics consent changes
    const handleConsentReady = () => {
      // Small delay to ensure Usercentrics is fully ready
      setTimeout(loadDeclaration, 100);
    };

    window.addEventListener('ucEvent', handleConsentReady);
    
    return () => {
      window.removeEventListener('ucEvent', handleConsentReady);
    };
  }, [lang]);

  // Don't render anything if Usercentrics is disabled
  if (!ENV.USERCENTRICS_ENABLED || !ENV.USERCENTRICS_SETTINGS_ID) {
    return (
      <div className={`p-4 bg-gray-100 rounded-lg text-center ${className}`}>
        <p className="text-gray-600">
          Declaração de cookies não disponível. 
          Configure o Usercentrics para exibir a declaração.
        </p>
      </div>
    );
  }

  return (
    <div className={`cookie-declaration-container ${className}`}>
      <div 
        ref={declarationRef}
        className="usercentrics-declaration"
        style={{ minHeight: '200px' }}
      />
      <style jsx>{`
        .cookie-declaration-container {
          width: 100%;
        }
        
        .usercentrics-declaration :global(table) {
          width: 100% !important;
          border-collapse: collapse !important;
          margin: 1rem 0 !important;
        }
        
        .usercentrics-declaration :global(th),
        .usercentrics-declaration :global(td) {
          border: 1px solid #e5e7eb !important;
          padding: 0.75rem !important;
          text-align: left !important;
        }
        
        .usercentrics-declaration :global(th) {
          background-color: #f9fafb !important;
          font-weight: bold !important;
          color: #374151 !important;
        }
        
        .usercentrics-declaration :global(tr:nth-child(even)) {
          background-color: #f9fafb !important;
        }
        
        .usercentrics-declaration :global(.cookie-table-header) {
          background-color: #3b82f6 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
} 