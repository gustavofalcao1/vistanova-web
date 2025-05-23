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
    name: "4Finance",
    logo: "/img/partners/logo-4finance.png"
  },
  {
    name: "Abanca",
    logo: "/img/partners/logo-abanca.png"
  },
  {
    name: "Banco CTT",
    logo: "/img/partners/logo-bancoctt.png"
  },
  {
    name: "Bankinter",
    logo: "/img/partners/logo-bankinter.png"
  },
  {
    name: "BP",
    logo: "/img/partners/logo-bp.png"
  },
  {
    name: "BPI",
    logo: "/img/partners/logo-bpi.png"
  },
  {
    name: "CGD",
    logo: "/img/partners/logo-cgd.png"
  },
  {
    name: "Cofidis",
    logo: "/img/partners/logo-cofidis.png"
  },
  {
    name: "Credibom",
    logo: "/img/partners/logo-credibom.png"
  },
  {
    name: "Eurobic Abanca",
    logo: "/img/partners/logo-eurobic_abanca.png"
  },
  {
    name: "MDS",
    logo: "/img/partners/logo-mds.png"
  },
  {
    name: "Novo Banco",
    logo: "/img/partners/logo-novobanco.png"
  },
  {
    name: "Santander",
    logo: "/img/partners/logo-santander.png"
  },
  {
    name: "UCI",
    logo: "/img/partners/logo-uci.png"
  },
  {
    name: "Unicre",
    logo: "/img/partners/logo-unicre.png"
  }
];

const protocols: Protocol[] = [
  {
    name: "Protocol 1",
    logo: "/img/protocols/1.webp"
  },
  {
    name: "Protocol 2",
    logo: "/img/protocols/2.png"
  },
  {
    name: "Protocol 3",
    logo: "/img/protocols/3.png"
  }
];

const contacts: ContactPerson[] = [
  {
    name: "Jorge Verissimo",
    role: "CEO",
    email: "jverissimo@vistanova.pt",
    phone: "+351912345678"
  },
  {
    name: "Ágatha Batista",
    role: "Operations Manager",
    email: "agathabatista@vistanova.pt",
    phone: "+351912345678"
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
