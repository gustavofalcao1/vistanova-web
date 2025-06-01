"use client"

import React, { useEffect } from "react";

// Layout Components
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

// Section Components
import HeroCarousel from "@/components/sections/HeroCarousel";
import AboutUsSection from "@/components/sections/AboutUsSection";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PartnersSection from "@/components/sections/PartnersSection";
import ProtocolsSection from "@/components/sections/ProtocolsSection";
import WeAreHereSection from "@/components/sections/WeAreHereSection";
import FAQSection from "@/components/sections/FAQSection";
import ImpactSection from "@/components/sections/ImpactSection";

// Types
import { Service, FAQ, ContactPerson, PartnerLogo, Protocol } from "@/types";
import { NewsletterFormData } from "@/lib/types";

const services: Service[] = [
  {
    icon: "House",
    title: "Crédito habitação",
    description: "A casa começa com o crédito."
  },
  {
    icon: "RefreshCw",
    title: "Transferência de crédito",
    description: "Troca o peso por alívio."
  },
  {
    icon: "PiggyBank",
    title: "Crédito pessoal",
    description: "Financia planos. Realiza momentos."
  },
  {
    icon: "Car",
    title: "Crédito automóvel",
    description: "Liga o motor dos teus sonhos."
  },
  {
    icon: "HandCoins",
    title: "Crédito consolidado",
    description: "Junta tudo. Paga menos, melhor."
  },
  {
    icon: "HardHat",
    title: "Crédito para obras",
    description: "Renova. Melhora. Valoriza a casa."
  },
  {
    icon: "Hammer",
    title: "Autoconstrução",
    description: "Constrói do zero, com apoio."
  },
  {
    icon: "MapPinned",
    title: "Aquisição de terreno",
    description: "Terreno hoje, casa amanhã."
  },
  {
    icon: "CreditCard",
    title: "Cartões de crédito",
    description: "Flexibilidade diária, com responsabilidade."
  },
];

const partners: PartnerLogo[] = [
  {
    name: "Abanca",
    logo: "/optimized-assets/partners/logo-abanca.webp"
  },
  {
    name: "Banco CTT",
    logo: "/optimized-assets/partners/logo-bancoctt.webp"
  },
  {
    name: "Bankinter",
    logo: "/optimized-assets/partners/logo-bankinter.webp"
  },
  {
    name: "BBVA",
    logo: "/optimized-assets/partners/logo-bbva.webp"
  },
  {
    name: "BPI",
    logo: "/optimized-assets/partners/logo-bpi.webp"
  },
  {
    name: "CGD",
    logo: "/optimized-assets/partners/logo-cgd.webp"
  },
  {
    name: "Cofidis",
    logo: "/optimized-assets/partners/logo-cofidis.webp"
  },
  {
    name: "Credibom",
    logo: "/optimized-assets/partners/logo-credibom.webp"
  },
  {
    name: "Eurobic",
    logo: "/optimized-assets/partners/logo-eurobic.webp"
  },
  {
    name: "Novo Banco",
    logo: "/optimized-assets/partners/logo-novobanco.webp"
  },
  {
    name: "Santander",
    logo: "/optimized-assets/partners/logo-santander.webp"
  },
  {
    name: "UCI",
    logo: "/optimized-assets/partners/logo-uci.webp"
  },
  {
    name: "Unicre",
    logo: "/optimized-assets/partners/logo-unicre.webp"
  }
];

const protocols: Protocol[] = [
  {
    name: "Ordem dos Contabilistas Certificados",
    logo: "/optimized-assets/protocols/logo_occ.webp"
  },
  {
    name: "Ordem dos Enfermeiros",
    logo: "/optimized-assets/protocols/logo_oe.webp"
  },
  {
    name: "Jerónimo Martins",
    logo: "/optimized-assets/protocols/logo_jm.webp"
  },
  {
    name: "Amuto",
    logo: "/optimized-assets/protocols/logo_amg.webp"
  },
  {
    name: "Salvador Caetano",
    logo: "/optimized-assets/protocols/logo_sc.webp"
  }
];

const contacts: ContactPerson[] = [
  {
    name: "Jorge Veríssimo",
    role: "Diretor Geral",
    email: "jverissimo@vistanova.pt",
    phone: "+351965091853",
    photo: "/optimized-assets/images/jv.webp"
  },
  {
    name: "Ágatha Santos",
    role: "Especialista em Crédito",
    email: "agathasantos@vistanova.pt",
    phone: "+351924967148",
    photo: "/optimized-assets/images/ab.webp"
  }
];

const faqs: FAQ[] = [
  {
    question: "Tenho de pagar pelo vosso serviço?",
    answer: "Não. O nosso serviço é totalmente gratuito para ti. Atuamos segundo o artigo 46.º do Decreto-Lei 81-C/2017."
  },
  {
    question: "A Vista Nova é um banco?",
    answer: "Não. Somos uma empresa de intermediação de crédito, registada e autorizada pelo Banco de Portugal com o nº 2543."
  },
  {
    question: "Posso confiar nas propostas que me apresentam?",
    answer: "Sim. A nossa missão é aconselhar de forma clara e isenta, com base no teu perfil e nos nossos 13 parceiros."
  },
  {
    question: "Sou obrigado a aceitar a proposta que me apresentarem?",
    answer: "Não. A decisão é sempre tua. A Vista Nova apresenta, compara e aconselha, mas nunca pressiona."
  },
  {
    question: "Ajudam mesmo depois da contratação do crédito?",
    answer: "Sim. Fazemos acompanhamento pós-escritura. Estamos contigo até depois do contrato assinado."
  },
  {
    question: "Com que bancos e instituições trabalham?",
    answer: "Trabalhamos com 13 bancos e financeiras reconhecidas em Portugal. Podes ver todos na secção 'Parceiros'."
  }
];

const handleNewsletterSubmit = async (data: NewsletterFormData) => {
  try {
    // Simulate API call - here you would implement the actual API call
    console.log('Newsletter data:', {
      ...data,
      recaptchaTokenReceived: !!data.recaptchaToken
    });
    
    // In a production environment, you would send the recaptchaToken for validation on the server
    // Example:
    // const response = await fetch('/api/newsletter', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // const result = await response.json();
    // return result;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  } catch (error) {
    console.error('Error sending newsletter:', error);
    return { success: false, error: "Falha ao enviar a tua inscrição na newsletter" };
  }
};

export default function Home() {
  // Função para verificar e processar o scrollToSection do sessionStorage
  useEffect(() => {
    // Função para tentar rolar até um elemento com múltiplas tentativas
    const scrollToElement = (elementId: string) => {
      // Número máximo de tentativas
      const maxAttempts = 15;
      // Intervalo entre tentativas (ms)
      const interval = 300;
      let attempts = 0;
      
      const tryScroll = () => {
        const targetElement = document.getElementById(elementId);
        
        if (targetElement) {
          // Elemento encontrado, rola até ele com um atraso maior para garantir que tudo esteja carregado
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }, 200);
          return true;
        } else if (attempts < maxAttempts) {
          // Elemento não encontrado, tenta novamente
          attempts++;
          setTimeout(tryScroll, interval);
          return false;
        } else {
          // Desiste após o número máximo de tentativas
          console.warn(`Elemento #${elementId} não encontrado após ${maxAttempts} tentativas`);
          return false;
        }
      };
      
      // Inicia a primeira tentativa com um atraso inicial para garantir que os componentes começaram a carregar
      setTimeout(tryScroll, 500);
    };

    // Verifica se há uma seção para rolar armazenada no sessionStorage
    if (typeof window !== 'undefined') {
      const sectionToScroll = sessionStorage.getItem('scrollToSection');
      if (sectionToScroll) {
        // Remove o item do sessionStorage para não rolar novamente em futuros carregamentos
        sessionStorage.removeItem('scrollToSection');
        // Tenta rolar até a seção
        scrollToElement(sectionToScroll);
      }
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <HeroCarousel />
      <AboutUsSection />
      <WhatWeDoSection />
      <ServicesSection services={services} />
      <PartnersSection partners={partners} />
      <ProtocolsSection protocols={protocols} />
      <WeAreHereSection contacts={contacts} onNewsletterSubmit={handleNewsletterSubmit} />
      <FAQSection faqs={faqs} />
      <ImpactSection />
      <Footer />
    </main>
  );
}
