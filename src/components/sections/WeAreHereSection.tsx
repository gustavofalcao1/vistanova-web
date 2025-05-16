import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ContactPerson, NewsletterSubscription } from "@/lib/types";
import { Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    consent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.name || !formData.consent) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha todos os campos e aceite os termos.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await onNewsletterSubmit(formData);
      
      if (result.success) {
        toast({
          title: "Inscrição realizada!",
          description: "Obrigado por se inscrever na nossa newsletter.",
          variant: "default"
        });
        setFormData({
          email: "",
          name: "",
          consent: false
        });
      } else {
        toast({
          title: "Erro ao enviar",
          description: "Ocorreu um erro ao processar sua inscrição. Tente novamente.",
          variant: "destructive"
        });
      }
    } catch {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao processar sua inscrição. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="estamos-aqui" 
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.3985590261436!2d-8.634811924249076!3d41.12582461217906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd246526038471eb%3A0xbcc6fd0cdae10b46!2sMaxfinance%20Nova!5e0!3m2!1sen!2spt!4v1746209444412!5m2!1sen!2spt"
                width="600"
                height="800"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
                className="w-full h-[550px] rounded-xl shadow-lg"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-neutral-100 rounded-xl p-8"
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <h3 className="text-2xl font-semibold text-primary mb-6">Fique Atualizado</h3>
            <p className="text-neutral-700 mb-6">
              Inscreva-se na nossa newsletter para receber novidades e dicas exclusivas para o seu negócio.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
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
                  required
                />
              </div>
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
                  Concordo em receber comunicações da VISTA NOVA conforme a Política de Privacidade.
                </label>
              </div>
              <motion.button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Enviando..." : "Inscrever-se"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
