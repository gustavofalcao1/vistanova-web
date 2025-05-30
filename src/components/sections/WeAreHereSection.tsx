import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ContactPerson, NewsletterSubscription } from "@/lib/types";
import { Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRecaptcha } from "@/hooks/useRecaptcha";

interface WeAreHereSectionProps {
  contacts: ContactPerson[];
  onNewsletterSubmit: (data: NewsletterSubscription) => Promise<{ success: boolean; error?: unknown }>;
}

export default function WeAreHereSection({ contacts, onNewsletterSubmit }: WeAreHereSectionProps) {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<NewsletterSubscription>({
    email: "",
    name: "",
    message: "",
    consent: false,
    subscribeToNewsletter: true
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getRecaptchaToken } = useRecaptcha();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent, subscribe: boolean) => {
    e.preventDefault();
    
    const submissionData = {
      ...formData,
      subscribeToNewsletter: subscribe
    };
    
    if (!submissionData.email || !submissionData.name || !submissionData.message || !submissionData.consent) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha todos os campos obrigatórios e aceite os termos.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Obter token do reCAPTCHA
      const recaptchaToken = await getRecaptchaToken('contact_form');
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submissionData,
          recaptchaToken,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Mensagem enviada com sucesso!",
          description: subscribe 
            ? "Obrigado por se inscrever na nossa newsletter!" 
            : "Obrigado pelo seu contato! Retornaremos em breve.",
          variant: "default"
        });
        setFormData(prev => ({
          ...prev,
          email: "",
          name: "",
          message: "",
          consent: false,
          subscribeToNewsletter: true
        }));
      } else {
        toast({
          title: "Erro ao enviar",
          description: result.error || "Ocorreu um erro ao processar sua mensagem. Tente novamente.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar sua mensagem. Por favor, tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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
          <span className="text-secondary font-semibold">Contacte-nos</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-primary">Estamos Aqui</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contacts.map((contact, index) => (
            <motion.div 
              key={index}
              className="bg-neutral-100 rounded-xl p-6 text-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.5,
                    delay: index * 0.1
                  }
                }
              }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-primary/10">
                {contact.photo ? (
                  <Image 
                    src={contact.photo} 
                    alt={contact.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary text-2xl font-bold">
                    {contact.name.charAt(0)}
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">{contact.name}</h3>
              <p className="text-neutral-700 mb-3">{contact.role}</p>
              <div className="flex items-center justify-center gap-2">
                <a 
                  href={`tel:${contact.phone}`} 
                  className="text-primary hover:text-secondary transition-colors"
                  aria-label={`Ligar para ${contact.name}`}
                >
                  <Phone className="h-5 w-5" />
                </a>
                <a 
                  href={`mailto:${contact.email}`} 
                  className="text-primary hover:text-secondary transition-colors"
                  aria-label={`Enviar email para ${contact.name}`}
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            className="bg-neutral-100 rounded-xl overflow-hidden h-140"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <div className="w-full h-full flex items-center justify-center bg-neutral-200 relative">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.3987532634856!2d-8.634833888637129!3d41.125820371214694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd246530cd054073%3A0xd52f534652e26b69!2sVista%20Nova%2C%20Lda.!5e0!3m2!1spt-BR!2spt!4v1748551784864!5m2!1spt-BR!2spt" width="600" height="800" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-neutral-100 rounded-xl p-8"
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <h3 className="text-2xl font-semibold text-primary mb-6">Contacta-nos e Fica Atualizado</h3>
            <p className="text-neutral-700 mb-6">
              Inscreve-te na nossa newsletter para receberes novidades e dicas exclusivas ou para o teu negócio.
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                  placeholder="seu-email@exemplo.com" 
                  required
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                  placeholder="Seu Nome" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[120px]"
                  placeholder="Sua mensagem..."
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded" 
                    required
                  />
                  <label htmlFor="consent" className="ml-2 block text-sm text-neutral-700">
                    Concordo com os termos de privacidade e tratamento de dados. *
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    id="subscribeToNewsletter" 
                    name="subscribeToNewsletter"
                    checked={formData.subscribeToNewsletter}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                  />
                  <label htmlFor="subscribeToNewsletter" className="ml-2 block text-sm text-neutral-700">
                    Desejo receber a newsletter com novidades e atualizações.
                  </label>
                </div>
              </div>
              <div className="space-y-3">
                <motion.button 
                  type="button" 
                  onClick={(e) => handleSubmit(e, true)}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? "Enviando..." : "Enviar e assinar newsletter"}
                </motion.button>
                
                <motion.button 
                  type="button"
                  onClick={(e) => handleSubmit(e, false)}
                  className="w-full bg-white text-primary border-1 border-primary hover:bg-gray-50 font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? "Enviando..." : "Apenas enviar"}
                </motion.button>
              </div>
              
              <p className="text-xs text-neutral-500">
                * Campos obrigatórios
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
