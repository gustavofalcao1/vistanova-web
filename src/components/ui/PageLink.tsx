'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
  const isHome = pathname === '/';
  const isHashLink = to.startsWith('#');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // Se for um link de hash
    if (isHashLink) {
      e.preventDefault();
      const targetId = to.substring(1);
      
      // Se não estiver na home, navega para a home com o hash
      if (!isHome) {
        // Armazena o targetId no sessionStorage para recuperá-lo após a navegação
        sessionStorage.setItem('scrollToSection', targetId);
        window.location.href = `/#${targetId}`;
        return;
      }
      
      // Se já estiver na home, rola até a seção
      scrollToElement(targetId);
    }
  };
  
  // Função para tentar rolar até um elemento com múltiplas tentativas
  const scrollToElement = (elementId: string) => {
    // Número máximo de tentativas
    const maxAttempts = 10;
    // Intervalo entre tentativas (ms)
    const interval = 600;
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
          window.history.replaceState(null, '', ' ');
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

  // Se for um link de hash e não estiver na home, redireciona para a home com o hash
  const href = isHashLink && !isHome ? `/${to}` : to;

  return (
    <Link 
      href={href}
      className={className}
      onClick={handleClick}
      scroll={!isHashLink}
      {...props}
    >
      {children}
    </Link>
  );
};
