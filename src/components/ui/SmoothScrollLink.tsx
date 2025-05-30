import React, { MouseEvent } from 'react';
import Link, { LinkProps } from 'next/link';

interface SmoothScrollLinkProps extends Omit<LinkProps, 'href' | 'onClick'> {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({
  to,
  className = '',
  children,
  onClick,
  ...props
}) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Executa o onClick personalizado se existir
    if (onClick) {
      onClick(e);
    }

    // Navegação suave para o elemento
    const targetId = to.startsWith('#') ? to.substring(1) : to;
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <Link 
      href={to} 
      className={className} 
      onClick={handleClick}
      scroll={false}
      {...props}
    >
      {children}
    </Link>
  );
};
