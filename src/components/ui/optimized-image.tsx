import React from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

/**
 * OptimizedImage component
 * A wrapper around Next.js Image component with performance optimizations
 */
export function OptimizedImage({
  src,
  alt,
  className,
  fill,
  priority = false,
  quality = 85,
  sizes = '100vw',
  ...props
}: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      quality={quality}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      {...props}
      className={cn(
        'transition-opacity duration-300',
        fill ? 'object-cover' : '',
        className
      )}
      style={{
        ...props.style,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    />
  );
}

export default OptimizedImage;
