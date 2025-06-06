import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  message: z.string().min(4, { message: 'Mensagem deve ter pelo menos 4 caracteres' }),
  consent: z.boolean().refine(val => val === true, {
    message: 'Precisas de aceitar os termos de privacidade'
  })
});

// Newsletter form validation schema
export const newsletterFormSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }).optional(),
  email: z.string().email({ message: 'Email inválido' }),
  consent: z.boolean().refine(val => val === true, {
    message: 'Precisas de aceitar os termos de privacidade'
  })
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
