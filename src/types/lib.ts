// src/lib/types.ts

// Types specific to form data handling, validation schemas, or API interactions within the /lib directory.

/**
 * Defines the shape for contact form data submissions.
 * Used with Zod schema for validation and by the contact API route.
 */
export interface ContactFormData {
    name: string;
    email: string;
    message: string;
    consent: boolean;      // User's consent to privacy policy
    recaptchaToken?: string; // Optional reCAPTCHA token for server-side verification
  }
  
  /**
   * Defines the shape for newsletter subscription form data.
   * Used with Zod schema for validation and by the newsletter subscription logic.
   */
  export interface NewsletterFormData {
    name: string; // User's name (optional in some forms, required here)
    email: string;
    consent: boolean;      // User's consent for marketing communications
    recaptchaToken?: string; // Optional reCAPTCHA token
  }
  
  // Entity types like Service, PartnerLogo, FAQ, etc., should now be imported
  // from '@/types/entities' or '@/types' if they are needed in /lib functions.
  // Example: import type { Service } from '@/types/entities';
  