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

// Career application form validation schema
export const careerFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Telefone deve ter pelo menos 9 dígitos"),
  position: z.string().min(1, "Seleciona a posição de interesse"),
  experience: z.string().min(1, "Seleciona o nível de experiência"),
  motivation: z.string().min(50, "Carta de motivação deve ter pelo menos 50 caracteres"),
  availability: z.string().min(1, "Seleciona a disponibilidade"),
  linkedin: z.string().optional(),
  cv: z.any().refine((files) => files?.length > 0, "CV é obrigatório"),
  consent: z.boolean().refine((val) => val === true, "Deves aceitar os termos")
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
export type CareerFormValues = z.infer<typeof careerFormSchema>;
export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
