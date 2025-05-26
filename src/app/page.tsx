"use client"

// Layout Components
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

// Section Components
import HeroSection from "@/components/sections/HeroSection";
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

const services: Service[] = [
  {
    icon: "House",
    title: "Crédito habitação",
    description: "Análise e "
  },
  {
    icon: "RefreshCw",
    title: "Transferência de crédito",
    description: "Otimização de recursos e planejamento financeiro eficiente."
  },
  {
    icon: "PiggyBank",
    title: "Crédito pessoal",
    description: "Desenvolvimento de liderança e otimização de desempenho."
  },
  {
    icon: "Car",
    title: "Crédito automóvel",
    description: "Pesquisa e identificação de oportunidades no seu setor."
  },
  {
    icon: "HandCoins",
    title: "Crédito consolidado",
    description: "Implementação de soluções inovadoras para o seu negócio."
  },
  {
    icon: "HardHat",
    title: "Crédito para obras",
    description: "Estratégias de comunicação e posicionamento de marca."
  },
  {
    icon: "Hammer",
    title: "Autoconstrução",
    description: "Planejamento e execução eficiente de projetos empresariais."
  },
  {
    icon: "MapPinned",
    title: "Aquisição de terreno",
    description: "Implementação de soluções inovadoras para o seu negócio."
  },
  {
    icon: "CreditCard",
    title: "Cartões de crédito",
    description: "Implementação de soluções inovadoras para o seu negócio."
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
    name: "Jorge Verissimo",
    role: "CEO",
    email: "jverissimo@vistanova.pt",
    phone: "+351965091853",
    photo: "/assets/images/jv.jpg"
  },
  {
    name: "Ágatha Batista",
    role: "Operations Manager",
    email: "agathabatista@vistanova.pt",
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

const handleNewsletterSubmit = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  } catch {
    return { success: false, error: "Failed to submit newsletter" };
  }
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
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
