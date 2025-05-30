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

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  consent: boolean;
}

export interface NewsletterFormData {
  name: string;
  email: string;
  consent: boolean;
}
