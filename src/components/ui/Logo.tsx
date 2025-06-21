import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'default' | 'white';
  className?: string;
  width?: number;
}

export function Logo({ variant = 'default', className = '', width = 180 }: LogoProps) {
  const logoPath = variant === 'white' 
    ? '/optimized-assets/brand/logo_white.webp' 
    : '/optimized-assets/brand/logo.webp';
  
  return (
    <div className={`relative flex items-center ${className}`}>
      <Link href="/" className="inline-block">
        <div className="flex items-center justify-center">
          <Image
            src={logoPath}
            alt="VISTA NOVA - Especialista em intermediação de crédito"
            width={width}
            height={width / 2}
            className="h-auto w-auto"
            priority
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              margin: '0 auto'
            }}
          />
        </div>
      </Link>
    </div>
  );
}
