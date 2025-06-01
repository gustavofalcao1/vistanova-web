// src/types/entities.ts

/**
 * Represents a service offered.
 */
export interface Service {
    icon: string; // Icon name (e.g., from Lucide) or path
    title: string;
    description: string;
  }
  
  /**
   * Represents a partner institution.
   */
  export interface PartnerLogo {
    name: string;
    logo?: string; // Path to the logo image, optional
  }
  
  /**
   * Represents a protocol or agreement with an entity.
   */
  export interface Protocol {
    name: string;
    logo?: string; // Path to the logo image, optional
  }
  
  /**
   * Represents a contact person within the team.
   */
  export interface ContactPerson {
    name:string;
    role: string;
    email: string;
    phone: string;
    photo?: string; // Path to the person's photo, optional
  }
  
  /**
   * Represents a Frequently Asked Question item.
   */
  export interface FAQ {
    question: string;
    answer: string;
  }
  
  // Consider moving NewsletterSubscription here if it's a core data entity
  // and not just a form data structure.
  // For now, keeping it separate as NewsletterFormData in lib/types.ts is more specific to forms.
  