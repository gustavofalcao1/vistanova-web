// src/types/props.ts
import type React from 'react';
import type { FAQ, Service } from './entities'; // Import entity types

/**
 * Props for the main application layout component.
 */
export interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * Base props for section components.
 */
export interface SectionProps {
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Props for a generic Button component.
 * (Consider if this is for your custom Button or relates to shadcn Button props)
 */
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'; // Example variants
  size?: 'small' | 'medium' | 'large';    // Example sizes
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode; // Buttons usually have children
}

/**
 * Props for a generic Image component.
 * (Consider if this is for your custom Image or relates to Next/Image props)
 */
export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // Common for Next/Image
}

/**
 * Props for a generic Link component.
 */
export interface LinkProps {
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  className?: string;
  children: React.ReactNode;
}

// --- Section Specific Props ---

/**
 * Props for the Hero section component.
 */
export interface HeroSectionProps extends SectionProps {
  ctaText?: string;
  ctaLink?: string;
}

/**
 * Props for the FAQ section component.
 */
export interface FAQSectionProps extends SectionProps {
  items: Array<FAQ>;
}

/**
 * Props for the Services section component.
 */
export interface ServicesSectionProps extends SectionProps {
  services: Array<Service>;
}
