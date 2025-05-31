"use client"

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
    logo: "/assets/partners/logo-abanca.png"
  },
  {
    name: "Banco CTT",
    logo: "/assets/partners/logo-bancoctt.png"
  },
  {
    name: "Bankinter",
    logo: "/assets/partners/logo-bankinter.png"
  },
  {
    name: "BBVA",
    logo: "/assets/partners/logo-bbva.png"
  },
  {
    name: "BPI",
    logo: "/assets/partners/logo-bpi.png"
  },
  {
    name: "CGD",
    logo: "/assets/partners/logo-cgd.png"
  },
  {
    name: "Cofidis",
    logo: "/assets/partners/logo-cofidis.png"
  },
  {
    name: "Credibom",
    logo: "/assets/partners/logo-credibom.png"
  },
  {
    name: "Eurobic",
    logo: "/assets/partners/logo-eurobic.png"
  },
  {
    name: "Novo Banco",
    logo: "/assets/partners/logo-novobanco.png"
  },
  {
    name: "Santander",
    logo: "/assets/partners/logo-santander.png"
  },
  {
    name: "UCI",
    logo: "/assets/partners/logo-uci.png"
  },
  {
    name: "Unicre",
    logo: "/assets/partners/logo-unicre.png"
  }
];

const protocols: Protocol[] = [
  {
    name: "Ordem dos Contabilistas Certificados",
    logo: "/assets/protocols/logo_occ.png"
  },
  {
    name: "Ordem dos Enfermeiros",
    logo: "/assets/protocols/logo_oe.webp"
  },
  {
    name: "Jerónimo Martins",
    logo: "/assets/protocols/logo_jm.png"
  },
  {
    name: "Amuto",
    logo: "/assets/protocols/logo_amg.png"
  },
  {
    name: "Salvador Caetano",
    logo: "/assets/protocols/logo_sc.png"
  }
];

const contacts: ContactPerson[] = [
  {
    name: "Jorge Veríssimo",
    role: "Diretor Geral",
    email: "jverissimo@vistanova.pt",
    phone: "+351965091853",
    photo: "/assets/images/jv.jpg"
  },
  {
    name: "Ágatha Santos",
    role: "Especialista em Crédito",
    email: "agathasantos@vistanova.pt",
    phone: "+351924967148",
    photo: "/assets/images/ab.jpg"
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
