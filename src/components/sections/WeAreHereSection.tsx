'use client';

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ContactPerson, NewsletterFormData } from "@/lib/types";
import { Phone, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterFormSchema, contactFormSchema, NewsletterFormValues, ContactFormValues } from "@/lib/schemas";

interface WeAreHereSectionProps {
  contacts: ContactPerson[];
  onNewsletterSubmit: (data: NewsletterFormData) => Promise<{ success: boolean; error?: unknown }>;
}

export default function WeAreHereSection({ contacts, onNewsletterSubmit }: WeAreHereSectionProps) {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();
  const { getRecaptchaToken } = useRecaptcha();
  
  // Newsletter form setup with react-hook-form
  const {
    register: registerNewsletter,
    handleSubmit: handleSubmitNewsletter,
    formState: { errors: errorsNewsletter, isSubmitting: isSubmittingNewsletter },
    reset: resetNewsletter
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
      consent: false
    }
  });

  // Contact form setup with react-hook-form
  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    formState: { errors: errorsContact, isSubmitting: isSubmittingContact },
    reset: resetContact
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      consent: false
    }
  });

  const onSubmitNewsletter = async (data: NewsletterFormValues) => {
    try {
      // Get reCAPTCHA token for newsletter form verification
      const recaptchaToken = await getRecaptchaToken('newsletter_form');
      
      // Convert form values to NewsletterFormData type
      const newsletterData: NewsletterFormData = {
        name: "", // We no longer use name for newsletter
        email: data.email,
        consent: data.consent,
        recaptchaToken: recaptchaToken || undefined // Convert null to undefined if token is null
      };
      
      // #DEV
      // Log the token for debugging purposes
      console.log('Newsletter submission with reCAPTCHA token', { tokenReceived: !!recaptchaToken });
      
      const result = await onNewsletterSubmit(newsletterData);
      
      if (result.success) {
        toast({
          title: "Inscrição realizada com sucesso!",
          description: "Obrigado por te inscreveres na nossa newsletter!",
          variant: "default"
        });
        resetNewsletter();
      } else {
        toast({
          title: "Erro na inscrição",
          description: String(result.error) || "Ocorreu um erro ao processar a tua inscrição. Tenta novamente.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error sending newsletter subscription:', error);
      toast({
        title: "Erro na inscrição",
        description: "Não foi possível processar a tua inscrição. Por favor, tenta novamente mais tarde.",
        variant: "destructive"
      });
    }
  };
  
  const onSubmitContact = async (data: ContactFormValues) => {
    try {
      // Get reCAPTCHA token for contact form verification
      const recaptchaToken = await getRecaptchaToken('contact_form');
      
      // #DEV
      // Log the token for debugging purposes
      console.log('Contact form submission with reCAPTCHA token', { tokenReceived: !!recaptchaToken });
      
      // Send the contact form data to the API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken: recaptchaToken || undefined // Convert null to undefined if token is null
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Mensagem enviada com sucesso!",
          description: "Obrigado pelo teu contacto! Contacta-mos em breve.",
          variant: "default"
        });
        resetContact();
      } else {
        toast({
          title: "Erro ao enviar mensagem",
          description: result.error || "Ocorreu um erro ao processar a tua mensagem. Tenta novamente.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error sending contact message:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Não foi possível enviar a tua mensagem. Por favor, tenta novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  return (
    <section 
      id="contact" 
      className={`py-20 px-4 sm:px-6 lg:px-14 bg-white ${isVisible ? 'section-visible' : 'section-hidden'}`}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <div 
          className="text-center mb-16 animate-fade-in-up"
          style={isVisible ? { animationPlayState: 'running' } : { animationPlayState: 'paused' }}
        >
          <span className="text-primary font-semibold">Contacta-nos</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-primary">Estamos Aqui</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 [@media(min-width:976px)]:grid-cols-2 gap-8 mt-12">
          <motion.div 
            className="bg-neutral-100 rounded-xl shadow-lg p-8"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <h3 className="text-2xl font-semibold text-primary mb-4">Equipa</h3>
            <div className="space-y-6">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-center gap-8">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                    {contact.photo ? (
                      <Image 
                        src={contact.photo} 
                        alt={contact.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-500">
                        {contact.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="pt-2">
                    <h4 className="font-semibold text-xl text-primary">{contact.name}</h4>
                    <p className="text-neutral-600 text-sm">{contact.role}</p>
                    <div className="mt-2 space-y-1">
                      <a 
                        href={`tel:${contact.phone}`} 
                        className="flex items-center gap-2 text-neutral-700 hover:text-primary transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{contact.phone}</span>
                      </a>
                      <a 
                        href={`mailto:${contact.email}`} 
                        className="flex items-center gap-2 text-neutral-700 hover:text-primary transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span>{contact.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <h3 className="text-2xl font-semibold text-primary mb-4">Onde Estamos</h3>
              <div className="w-full h-[350px] rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Vista+Nova,+Lda.&zoom=16" 
                  className="w-full h-full rounded-lg" 
                  style={{border:0}} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-neutral-100 rounded-xl p-8 shadow-lg"
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            {/* Bloco de Newsletter */}
            <div className="mb-8 pb-8 border-b border-neutral-200">
              <h3 className="text-2xl font-semibold text-primary mb-4">Newsletter</h3>
              <p className="text-neutral-700 mb-4">
                Inscreve-te na nossa newsletter para receberes novidades e dicas exclusivas.
              </p>
              <form className="space-y-3" onSubmit={handleSubmitNewsletter(onSubmitNewsletter)}>
                <div>
                  <div className="flex">
                    <input 
                      type="email" 
                      id="newsletter-email" 
                      className={`flex-1 px-4 py-2 rounded-l-lg border-y border-l ${errorsNewsletter.email ? 'border-red-500' : 'border-neutral-300'} focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary`} 
                      placeholder="Email *" 
                      {...registerNewsletter("email")}
                    />
                    <motion.button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-r-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      disabled={isSubmittingNewsletter}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmittingNewsletter ? "..." : "Subscrever"}
                    </motion.button>
                  </div>
                  {errorsNewsletter.email && (
                    <p className="text-red-500 text-xs mt-1">{errorsNewsletter.email.message}</p>
                  )}
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="newsletter-consent" 
                    className={`mt-1 h-4 w-4 text-primary focus:ring-primary ${errorsNewsletter.consent ? 'border-red-500' : 'border-neutral-300'} rounded`} 
                    {...registerNewsletter("consent")}
                  />
                  <label htmlFor="newsletter-consent" className="ml-2 block text-xs text-neutral-700 mt-1">
                    Concordo em receber comunicações de marketing da Vista Nova. *
                  </label>
                </div>
                {errorsNewsletter.consent && (
                  <p className="text-red-500 text-xs">{errorsNewsletter.consent.message}</p>
                )}
                
                <p className="text-xs text-neutral-500">
                  Ao subscrever, concordas com a nossa <a href="/politica-de-privacidade" className="text-primary hover:underline">Política de Privacidade</a>.
                </p>
              </form>
            </div>
            
            {/* Bloco de Contacto */}
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-4">Contacto Rápido</h3>
              <p className="text-neutral-700 mb-4">
                Envia-nos uma mensagem rápida e responderemos o mais breve possível.
              </p>
              <form className="space-y-3" onSubmit={handleSubmitContact(onSubmitContact)}>
                <div>
                  <input 
                    type="text" 
                    id="contact-name" 
                    className={`w-full px-4 py-2 rounded-lg border ${errorsContact.name ? 'border-red-500' : 'border-neutral-300'} focus:outline-none focus:ring-1 focus:ring-primary`} 
                    placeholder="Nome *" 
                    {...registerContact("name")}
                  />
                  {errorsContact.name && (
                    <p className="text-red-500 text-xs mt-1">{errorsContact.name.message}</p>
                  )}
                </div>
                
                <div>
                  <input 
                    type="email" 
                    id="contact-email" 
                    className={`w-full px-4 py-2 rounded-lg border ${errorsContact.email ? 'border-red-500' : 'border-neutral-300'} focus:outline-none focus:ring-1 focus:ring-primary`} 
                    placeholder="Email *" 
                    {...registerContact("email")}
                  />
                  {errorsContact.email && (
                    <p className="text-red-500 text-xs mt-1">{errorsContact.email.message}</p>
                  )}
                </div>
                
                <div>
                  <textarea
                    id="contact-message"
                    className={`w-full px-4 py-2 rounded-lg border ${errorsContact.message ? 'border-red-500' : 'border-neutral-300'} focus:outline-none focus:ring-1 focus:ring-primary min-h-[80px]`}
                    placeholder="Mensagem *"
                    {...registerContact("message")}
                  />
                  {errorsContact.message && (
                    <p className="text-red-500 text-xs mt-1">{errorsContact.message.message}</p>
                  )}
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="contact-consent" 
                    className={`mt-1 h-4 w-4 text-primary focus:ring-primary ${errorsContact.consent ? 'border-red-500' : 'border-neutral-300'} rounded`}
                    {...registerContact("consent")}
                  />
                  <label htmlFor="contact-consent" className="ml-2 block text-xs text-neutral-700 mt-1">
                    Concordo com a <a href="/politica-de-privacidade" className="text-primary hover:underline">Política de Privacidade</a>. *
                  </label>
                </div>
                {errorsContact.consent && (
                  <p className="text-red-500 text-xs">{errorsContact.consent.message}</p>
                )}
                
                <motion.button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isSubmittingContact}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmittingContact ? "Enviando..." : "Enviar Mensagem"}
                </motion.button>
                
                <p className="text-xs text-neutral-500">
                  * Campos obrigatórios
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
