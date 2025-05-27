export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface PartnerLogo {
  name: string;
  logo?: string;
}

export interface Protocol {
  name: string;
  logo?: string;
}

export interface ContactPerson {
  name: string;
  role: string;
  photo?: string;
  phone: string;
  email: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface NewsletterSubscription {
  email: string;
  name: string;
  message: string;
  consent: boolean;
  subscribeToNewsletter: boolean;
}
