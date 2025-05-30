'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

interface PageLinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any;
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
        window.location.href = `/#${targetId}`;
        return;
      }
      
      // Se já estiver na home, rola até a seção
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        // Remove o hash da URL sem rolagem
        window.history.replaceState(null, '', ' ');
      } else {
        // Se o elemento ainda não estiver disponível, tenta novamente após um curto atraso
        const timer = setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
            window.history.replaceState(null, '', ' ');
          }
        }, 100);
        
        return () => clearTimeout(timer);
      }
    }
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
