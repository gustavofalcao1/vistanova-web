'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

interface PageLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const PageLink: React.FC<PageLinkProps> = ({
  to,
  className = '',
  children,
  onClick,
  ...props
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const isHashLink = to.startsWith('#');
  const targetId = isHashLink ? to.substring(1) : to.includes('#') ? to.split('#')[1] : '';

  // Check for saved section ID in sessionStorage after navigation
  // and handle scroll behavior based on current pathname
  useEffect(() => {
    const savedTargetId = sessionStorage.getItem('scrollToSection');
    
    if (savedTargetId) {
      // Remove the item from sessionStorage to prevent unwanted scrolls
      sessionStorage.removeItem('scrollToSection');
      // Scroll to the element after navigation is complete
      setTimeout(() => scrollToElement(savedTargetId), 300);
    } else if (pathname !== '/') {
      // If there's no target ID and we're not on the home page,
      // scroll to the top of the page for better navigation experience
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname]); // Re-run when pathname changes (App Router compatible)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // Se for um link de hash ou contiver um hash
    if (targetId) {
      e.preventDefault();
      
      // Se não estiver na home e o link for para a home com hash
      if (!isHome && (to === `#${targetId}` || to === `/#${targetId}`)) {
        // Armazena o targetId no sessionStorage para recuperá-lo após a navegação
        sessionStorage.setItem('scrollToSection', targetId);
        
        // Navega para a home sem o hash na URL
        router.push('/');
        return;
      }
      
      // Se já estiver na home e o link for para a mesma página com hash
      if (isHome && isHashLink) {
        scrollToElement(targetId);
        return;
      }
      
      // Se estiver na home e o link for para a home com hash (formato /#section)
      if (isHome && to.startsWith('/#')) {
        scrollToElement(targetId);
        return;
      }
      
      // Se for para outra página com hash
      if (to.includes('#') && !isHashLink) {
        const pagePath = to.split('#')[0];
        sessionStorage.setItem('scrollToSection', targetId);
        router.push(pagePath);
        return;
      }
    }
  };
  
  // Função para tentar rolar até um elemento com múltiplas tentativas
  const scrollToElement = (elementId: string) => {
    // Número máximo de tentativas
    const maxAttempts = 10;
    // Intervalo entre tentativas (ms)
    const interval = 300;
    let attempts = 0;
    
    const tryScroll = () => {
      const targetElement = document.getElementById(elementId);
      
      if (targetElement) {
        // Elemento encontrado, rola até ele
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          // Remove o hash da URL sem rolagem
          window.history.replaceState(null, '', pathname);
        }, 100);
        return true;
      } else if (attempts < maxAttempts) {
        // Elemento não encontrado, tenta novamente
        attempts++;
        setTimeout(tryScroll, interval);
        return false;
      } else {
        // Desiste após o número máximo de tentativas
        console.warn(`Elemento #${elementId} não encontrado após ${maxAttempts} tentativas`);
        return false;
      }
    };
    
    // Inicia a primeira tentativa
    tryScroll();
  };

  // Prepara o href para o Link do Next.js
  // Remove o hash para evitar que apareça na URL
  const href = isHashLink ? '/' : to.includes('#') ? to.split('#')[0] || '/' : to;

  return (
    <Link 
      href={href}
      className={className}
      onClick={handleClick}
      scroll={false} // Desativa o comportamento de scroll automático do Next.js
      {...props}
    >
      {children}
    </Link>
  );
};
