'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Componente interno que usa hooks que requerem suspense
function ScrollProviderInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const targetId = hash.substring(1);
    if (!targetId) return;

    // Função para tentar rolar até o elemento
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

    // Tenta rolar imediatamente
    if (tryScroll()) return;

    // Se não encontrou o elemento, tenta novamente após um atraso
    const retryInterval = setInterval(() => {
      if (tryScroll()) {
        clearInterval(retryInterval);
      }
    }, 150);

    // Limpa o intervalo após 3 segundos (20 tentativas)
    const timeout = setTimeout(() => {
      clearInterval(retryInterval);
    }, 3000);

    return () => {
      clearInterval(retryInterval);
      clearTimeout(timeout);
    };
  }, [pathname, searchParams]);

  return <>{children}</>;
}

function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return false;

  // Usa um scroll mais suave e garante que o elemento esteja visível
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
  
  return true;
}

// Wrapper com Suspense para evitar erros de hydration
export function ScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <ScrollProviderInner>{children}</ScrollProviderInner>
    </Suspense>
  );
}
