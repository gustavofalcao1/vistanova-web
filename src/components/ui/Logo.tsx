import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'default' | 'white';
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ variant = 'default', className = '', width = 180, height }: LogoProps) {
  // Calculate height based on aspect ratio if not provided
  const calculatedHeight = height || Math.round((width * 281) / 500); // 500x281 is the original SVG size
  
  return (
    <div className={`relative ${className}`} style={{ width: `${width}px`, height: `${calculatedHeight}px` }}>
      <Link href="/" className="block w-full h-full">
        <Image
          src="/assets/brand/logo.svg"
          alt="Vista Nova - Especialista em intermediação de crédito"
          width={width}
          height={calculatedHeight}
          className="h-full w-auto object-contain"
          priority
        />
      </Link>
    </div>
  );
}
