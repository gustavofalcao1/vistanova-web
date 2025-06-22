"use client"

import { Logo } from '@/components/ui/logo'
import { CareerForm } from '@/components/ui/career-form'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'
import { Toaster } from '@/components/ui/toaster'
import { CheckCircle } from 'lucide-react'

export default function TrabalhaConnosco() {
  const handleCareerSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        body: data, // FormData with file upload
      });

      const result = await response.json();

      if (response.ok && result.success) {
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.error || 'Erro ao enviar candidatura' };
      }
    } catch (error) {
      console.error('Error submitting career application:', error);
      return { success: false, error: 'Erro de conexão. Tente novamente.' };
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        
        {/* Hero Section */}
        <section className="w-full py-24 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                  Na &quot;VISTA NOVA&quot;, não contratamos para vender crédito.
                </h1>
                <div className="text-xl text-white/90 space-y-6 leading-relaxed">
                  <p>Contratamos para ajudar, aconselhar e prevenir.</p>
                  <p>Mais do que currículos, procuramos histórias. Pessoas com ética, visão e coragem para pensar diferente.</p>
                  <p>Acreditamos num futuro onde o crédito é explicado com clareza e assumido com consciência, e isso começa contigo.</p>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <Logo variant="white" width={300} className="max-w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Quem Somos Section */}
        <section className="w-full py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">AS VANTAGENS DE CAMINHARES CONNOSCO</h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">Porque escolher a Vista Nova para a tua carreira profissional</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "Equipa pequena e altamente comprometida",
                "Projeto com nome próprio e licença no Banco de Portugal (N° 2543)",
                "Liderança próxima e acessível",
                "Planeamento estratégico com base em ética e qualidade",
                "Um modelo que acredita no poder da verdade sobre a venda",
                "Um lugar onde as tuas ideias contam (mesmo!)"
              ].map((text, index) => (
                <div key={index} className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-foreground font-medium text-lg leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="w-full py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="objetivo" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white p-2 rounded-xl mb-16 shadow-sm h-14">
                <TabsTrigger 
                  value="objetivo" 
                  className="data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:font-bold font-semibold text-foreground/70 rounded-lg transition-all text-lg"
                >
                  Objetivo
                </TabsTrigger>
                <TabsTrigger 
                  value="perfil" 
                  className="data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:font-bold font-semibold text-foreground/70 rounded-lg transition-all text-lg"
                >
                  Perfil
                </TabsTrigger>
                <TabsTrigger 
                  value="vantagens" 
                  className="data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:font-bold font-semibold text-foreground/70 rounded-lg transition-all text-lg"
                >
                  Vantagens
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="objetivo" className="space-y-8">
                <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
                  <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-8">A TUA MISSÃO NESTA VIAGEM</h3>
                  <div className="bg-secondary/10 rounded-xl p-8 border-l-4 border-secondary mb-8">
                    <p className="text-2xl lg:text-3xl font-medium text-primary mb-6 italic">&quot;Ser um professor numa biblioteca&quot;</p>
                  </div>
                  <div className="space-y-6 text-lg text-foreground leading-relaxed">
                    <p>Imagina uma biblioteca. Agora imagina que cada cliente entra nela com dúvidas e sai com certezas. Tu és essa ponte. Um guia que ajuda a escolher o livro certo:</p>
                    <ul className="space-y-4 ml-6">
                      {[
                        "Crédito habitação",
                        "Crédito pessoal, automóvel ou consolidado", 
                        "Renegociação ou restruturação",
                        "Apoio pós-escritura"
                      ].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-secondary-onWhite mr-3 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p>Aqui, cada cliente tem o direito a analisar, a comparar e a refletir. A resposta nunca é só uma taxa ou um spread, mas sim uma explicação detalhada.</p>
                    <p className="font-medium text-primary text-xl">Ser Especialista de Crédito, na &quot;VISTA NOVA&quot;, é mais do que técnica: É ser consultor, formador e presença constante.</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="perfil" className="space-y-8">
                <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
                  <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-8">QUEM PROCURAMOS?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      "Capacidade de ouvir, ouvir, ouvir,… antes de falar",
                      "Clareza na comunicação e empatia",
                      "Paixão pela literacia financeira e pelo impacto positivo",
                      "Ética inabalável e compromisso com a verdade",
                      "Pensamento analítico com olhar humano",
                      "Vontade de formar e de informar",
                      "Desejo de crescer sem perder a essência"
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-secondary-onWhite mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground font-medium text-lg">{item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="vantagens" className="space-y-8">
                <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
                  <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-8">O QUE TE DAMOS PARA LÁ CHEGARES?</h3>
                  <div className="space-y-6">
                    {[
                      "Acesso direto a 13 bancos e 5 grandes parceiros",
                      "CRM próprio e leads qualificadas", 
                      "Zero pressão comercial (aqui não importa só \"fechar negócio\")",
                      "Marca ética, inovadora e independente",
                      "Modelo híbrido ou remoto, ajustado ao teu percurso"
                    ].map((item, index) => (
                      <div key={index} className="bg-secondary-subtle rounded-lg p-6 border-l-4 border-secondary-vibrant">
                        <div className="flex items-center">
                          <CheckCircle className="h-6 w-6 text-secondary-onWhite mr-4 flex-shrink-0" />
                          <span className="text-lg font-medium text-foreground">{item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Requisitos Section */}
        <section className="w-full py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <OptimizedImage
                  src="/assets/images/carrer.png"
                  alt="Equipa Vista Nova"
                  width={400}
                  height={320}
                  className="rounded-xl shadow-lg w-full max-w-xs mx-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-8">QUEM VALORIZAMOS?</h3>
                <div className="space-y-6">
                  {[
                    "Experiência em crédito (preferencial)",
                    "Formação em áreas financeiras ou humanas",
                    "Conhecimento do setor",
                    "Autonomia e espírito colaborativo"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                      <CheckCircle className="h-6 w-6 text-secondary-onWhite mr-4 flex-shrink-0" />
                      <span className="text-lg font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bloco de Destaque */}
        <section className="w-full py-24 bg-primary">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-8">E daqui a 3 anos?</h2>
              <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-8">O QUE TORNA ESTA VIAGEM AINDA MELHOR?</h3>
              <p className="text-xl lg:text-2xl text-white/90 mb-12">Farás parte de um projeto que:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  "Revolucionou a forma como se explica o crédito",
                  "Tornou-se uma referência em educação financeira", 
                  "Ajudou a criar a próxima geração de Especialistas de Crédito",
                  "Mostrou que ética e rentabilidade podem andar de mãos dadas"
                ].map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                    <p className="text-white font-medium text-lg text-center leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Formulário Section */}
        <section className="w-full py-24 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">Pronto para esta viagem?</h2>
              <p className="text-xl text-foreground/70">Preenche o formulário e envia-nos o teu CV.</p>
            </div>
            
            <div className="bg-primary rounded-2xl p-12 shadow-xl">
              <CareerForm onSubmit={handleCareerSubmit} />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">Perguntas Frequentes</h2>
              <p className="text-xl text-foreground/70">Esclarecemos as tuas principais dúvidas sobre trabalhar connosco</p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Há metas obrigatórias ou comissões forçadas?",
                  answer: "Não. Temos objetivos, mas sempre com ética e sem pressão."
                },
                {
                  question: "Preciso de experiência em crédito?",
                  answer: "Ajuda, mas não é tudo. Se tens perfil e vontade de aprender, tens espaço aqui."
                },
                {
                  question: "Como é o processo de seleção?",
                  answer: "Humano e direto. Sem formulários eternos. Envia um CV."
                },
                {
                  question: "Posso trabalhar remotamente?",
                  answer: "Sim, em várias fases e funções. Somos flexíveis."
                },
                {
                  question: "Trabalham com bancos?",
                  answer: "Sim, com 13 instituições, mas somos independentes. Sempre pelo cliente."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <AccordionTrigger className="px-8 py-6 text-left hover:no-underline hover:bg-gray-50 rounded-t-lg font-semibold text-primary text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 text-foreground text-lg leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Tagline Final */}
        <section className="w-full py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-lg md:text-3xl font-bold text-secondary leading-tight relative inline-block p-5">
              <span className="relative z-10">&quot;O futuro da literacia financeira e do crédito consciente</span>
              <br />
              <span className="relative z-10">em Portugal está a ser escrito. E talvez tenhas</span>
              <br />
              <span className="relative z-10">um parágrafo importante neste capítulo.&quot;</span>
              <div className="absolute inset-0 bg-primary -rotate-1 rounded-lg" />
            </h2>
          </div>
        </section>

      </main>
      <Footer />
      <Toaster />
    </div>
  );
} 