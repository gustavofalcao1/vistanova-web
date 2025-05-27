import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'default' | 'white';
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ variant = 'default', className = '', width = 180, height = 40 }: LogoProps) {
  const logoPath = '/assets/brand/processed/logo-transparent.png'; // Logo com fundo transparente

  return (
    <div className={`relative ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
      <Link href="/" className="block w-full h-full">
        <Image 
          src={logoPath}
          alt="Vista Nova - Especialista em intermediação de crédito"
          fill
          sizes={`(max-width: 768px) ${width / 2}px, ${width}px`}
          className="object-contain"
          priority
        />
      </Link>
    </div>
  );
}
