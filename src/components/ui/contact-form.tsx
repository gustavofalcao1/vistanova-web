'use client';

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from "@/lib/schemas";
import { ContactFormData } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { motion } from "framer-motion";

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<{ success: boolean; error?: unknown }>;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const { toast } = useToast();
  const { getRecaptchaToken } = useRecaptcha();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      consent: false
    }
  });

  const handleFormSubmit = async (data: ContactFormValues) => {
    try {
      // Get reCAPTCHA token for form verification
      const recaptchaToken = await getRecaptchaToken('contact_form');
      
      // Log the token for debugging purposes
      console.log('Contact form submission with reCAPTCHA token', { tokenReceived: !!recaptchaToken });
      
      // Send data to the server
      const result = await onSubmit({
        name: data.name,
        email: data.email,
        message: data.message,
        consent: data.consent,
        recaptchaToken: recaptchaToken || undefined // Convert null to undefined if token is null
      });
      
      if (result.success) {
        toast({
          title: "Mensagem enviada com sucesso!",
          description: "Obrigado pelo teu contacto! Contacta-mos em breve.",
          variant: "default"
        });
        reset();
      } else {
        toast({
          title: "Erro ao enviar mensagem",
          description: String(result.error) || "Ocorreu um erro ao processar a tua mensagem. Tenta novamente.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Não foi possível enviar a tua mensagem. Por favor, tenta novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-white/80 mb-1">Nome *</label>
        <input 
          type="text" 
          id="contact-name" 
          className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-400' : 'border-white/20'} bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
          placeholder="Teu Nome" 
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-white/80 mb-1">Email *</label>
        <input 
          type="email" 
          id="contact-email" 
          className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-400' : 'border-white/20'} bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
          placeholder="teu-email@exemplo.com" 
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-white/80 mb-1">Mensagem *</label>
        <textarea
          id="contact-message"
          className={`w-full px-4 py-2 rounded-lg border ${errors.message ? 'border-red-400' : 'border-white/20'} bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent min-h-[100px]`}
          placeholder="Tua mensagem..."
          {...register("message")}
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start">
          <input 
            type="checkbox" 
            id="contact-consent" 
            className={`mt-1 h-4 w-4 text-secondary focus:ring-secondary ${errors.consent ? 'border-red-400' : 'border-white/20'} rounded bg-white/10`}
            {...register("consent")}
          />
          <label htmlFor="contact-consent" className="ml-2 block text-sm text-white/80">
            Concordo com os termos de privacidade e tratamento de dados. *
          </label>
        </div>
        {errors.consent && (
          <p className="text-red-400 text-xs">{errors.consent.message}</p>
        )}
      </div>
      
      <motion.button 
        type="submit" 
        className="w-full bg-secondary hover:bg-secondary/90 text-primary font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
      </motion.button>
      
      <p className="text-xs text-white/60">
        * Campos obrigatórios
      </p>
    </form>
  );
}
