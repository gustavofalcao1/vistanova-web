'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';

/**
 * Development Cookiebot Banner
 * Simulates the Cookiebot banner for local development
 * Design similar to real Cookiebot/Usercentrics interface
 */
export default function CookiebotDev() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState({
    necessary: true,
    statistics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Only show in development on localhost
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
      
      if (isLocalhost) {
        // Check if user has already made a choice
        const savedConsent = localStorage.getItem('dev-cookiebot-consent');
        if (!savedConsent) {
          setShowBanner(true);
        } else {
          const parsed = JSON.parse(savedConsent);
          setConsent(parsed);
          // Simulate Cookiebot ready event
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('CookiebotOnConsentReady'));
            if (parsed.statistics) {
              window.dispatchEvent(new CustomEvent('cookiebot-statistics-enabled'));
            }
          }, 100);
        }
      }
    }
  }, []);

  const saveConsent = (newConsent: typeof consent) => {
    setConsent(newConsent);
    setShowBanner(false);
    setShowSettings(false);
    
    // Save to localStorage
    localStorage.setItem('dev-cookiebot-consent', JSON.stringify(newConsent));
    
    // Mock window.Cookiebot for development
    if (typeof window !== 'undefined') {
      (window as any).Cookiebot = {
        consent: newConsent,
        show: () => setShowBanner(true),
        hide: () => setShowBanner(false),
        renew: () => {
          localStorage.removeItem('dev-cookiebot-consent');
          setShowBanner(true);
        }
      };
      
      window.dispatchEvent(new CustomEvent('CookiebotOnConsentReady'));
      if (newConsent.statistics) {
        window.dispatchEvent(new CustomEvent('cookiebot-statistics-enabled'));
      }
    }
    
    console.log('🍪 [DEV] Consent saved:', newConsent);
  };

  const handleAcceptAll = () => {
    const newConsent = {
      necessary: true,
      statistics: true,
      marketing: true,
      preferences: true,
    };
    saveConsent(newConsent);
  };

  const handleSaveSettings = () => {
    saveConsent(consent);
  };

  const handleAcceptNecessary = () => {
    const newConsent = {
      necessary: true,
      statistics: false,
      marketing: false,
      preferences: false,
    };
    saveConsent(newConsent);
  };

  const resetConsent = () => {
    localStorage.removeItem('dev-cookiebot-consent');
    setShowBanner(true);
    setShowSettings(false);
    console.log('🍪 [DEV] Consent reset');
  };

  // Add a reset button for development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      const resetBtn = () => resetConsent();
      (window as any).resetCookieConsent = resetBtn;
      console.log('🍪 [DEV] Use window.resetCookieConsent() to reset consent');
    }
  }, []);

  if (!showBanner || process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Simple banner (initial state)
  if (!showSettings) {
    return (
      <div className="fixed inset-0 bg-black/50 z-[9999] flex items-end justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">VN</span>
              </div>
              <h3 className="font-semibold text-gray-900">
                🍪 [MODO DE DESENVOLVIMENTO]
              </h3>
            </div>
            <button
              onClick={() => handleAcceptNecessary()}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-sm text-gray-700 mb-4">
              Este site utiliza tecnologias de rastreamento de terceiros para fornecer e melhorar continuamente os nossos serviços, 
              e para exibir anúncios de acordo com os interesses dos utilizadores. Aceito e posso revogar ou alterar o meu consentimento 
              a qualquer momento com efeito para o futuro.
            </p>
            
            <button
              onClick={() => setShowSettings(true)}
              className="text-primary hover:text-primary/80 text-sm font-medium underline"
            >
              Mais Informações
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => setShowSettings(true)}
              variant="outline"
              className="flex-1"
            >
              Definições de Privacidade
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Aceitar Todos
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Powered by Vista Nova Development Mode
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Settings panel (detailed)
  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">VN</span>
              </div>
              <h3 className="font-semibold text-gray-900">
                Definições de Privacidade
              </h3>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-gray-700 mb-6">
            Este site utiliza tecnologias de rastreamento de terceiros para fornecer e melhorar continuamente os nossos serviços, 
            e para exibir anúncios de acordo com os interesses dos utilizadores. Aceito e posso revogar ou alterar o meu consentimento 
            a qualquer momento com efeito para o futuro.
          </p>

          {/* Cookie Categories */}
          <div className="space-y-4">
            {/* Necessary */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Essencial</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Cookies necessários para o funcionamento básico do site. Sempre ativos.
                </p>
              </div>
              <Switch
                checked={consent.necessary}
                disabled={true}
                className="ml-4"
              />
            </div>

            {/* Statistics */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Funcionais</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Cookies para análise de tráfego e performance do site (Google Analytics).
                </p>
              </div>
              <Switch
                checked={consent.statistics}
                onCheckedChange={(checked) => 
                  setConsent(prev => ({ ...prev, statistics: checked }))
                }
                className="ml-4"
              />
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Marketing</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Cookies para personalização de anúncios e conteúdo.
                </p>
              </div>
              <Switch
                checked={consent.marketing}
                onCheckedChange={(checked) => 
                  setConsent(prev => ({ ...prev, marketing: checked }))
                }
                className="ml-4"
              />
            </div>

            {/* Preferences */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Preferências</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Cookies para lembrar das suas preferências e configurações.
                </p>
              </div>
              <Switch
                checked={consent.preferences}
                onCheckedChange={(checked) => 
                  setConsent(prev => ({ ...prev, preferences: checked }))
                }
                className="ml-4"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleSaveSettings}
              variant="outline"
              className="flex-1"
            >
              Guardar Definições
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Aceitar Todos
            </Button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Powered by Vista Nova Development Mode
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 