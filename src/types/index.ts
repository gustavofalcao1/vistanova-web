// Global types for the application

// Re-exporting common entity and props types for easier access.
export * from './entities';
export * from './props';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export interface SectionProps {
  title?: string;
  description?: string;
  className?: string;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export interface LinkProps {
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  className?: string;
}

// Types for sections
export interface HeroSectionProps extends SectionProps {
  ctaText?: string;
  ctaLink?: string;
}

export interface FAQSectionProps extends SectionProps {
  items: Array<FAQ>;
}

export interface ServicesSectionProps extends SectionProps {
  services: Array<Service>;
}

// Additional types
export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactPerson {
  name: string;
  role: string;
  email: string;
  phone: string;
  photo?: string;
}

export interface PartnerLogo {
  name: string;
  logo: string;
}

export interface Protocol {
  name: string;
  logo?: string;
}

export interface NewsletterSubscription {
  email: string;
  consent: boolean;
}
