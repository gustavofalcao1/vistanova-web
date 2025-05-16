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
    description: "Análise e planejamento para crescimento sustentável do seu negócio."
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
  }
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
    name: "John Doe",
    role: "CEO",
    email: "john@example.com",
    phone: "+123456789"
  },
  {
    name: "Jane Smith",
    role: "Operations Manager",
    email: "jane@example.com",
    phone: "+987654321"
  }
];

const faqs: FAQ[] = [
  {
    question: "What is this website about?",
    answer: "This website is about something amazing."
  },
  {
    question: "How does it work?",
    answer: "It works by doing something magical."
  },
  {
    question: "Why should I use it?",
    answer: "Because it's awesome and you'll love it!"
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
