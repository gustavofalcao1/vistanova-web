import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Check } from "lucide-react";

export default function QuemSomosSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      id="quem-somos" 
      className="py-20 px-14 bg-neutral-100"
      ref={ref}
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        <motion.div 
          className="text-center mb-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <span className="text-secondary font-semibold">Conheça-nos</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-primary">Quem Somos</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <p className="text-lg text-neutral-800 text-center mb-2">
            Somos a Vista Nova, uma empresa de Intermediação de Crédito, registada no Banco de Portugal com o n.º 2543, e com 15 anos de experiência.
          </p>
          <p className="text-lg text-neutral-800 text-center mb-12">
            Ajudamos os nossos clientes a decidirem melhor.
          </p>

          <Accordion type="single" collapsible className="space-y-4 text-neutral-700">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <AccordionItem value="missao" className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
                <AccordionTrigger className="px-6 py-4 hover:bg-neutral-50 transition-colors text-left font-semibold text-primary">
                  Nossa Missão
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 border-t border-neutral-100">
                  <p className="py-4">
                    A nossa missão é com os nossos clientes:
                    garantir que contratem e gerem o seu crédito de forma consciente, com apoio em cada passo, acesso a informações claras e literacia financeira que transforma decisões e vidas.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <AccordionItem value="visao" className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
                <AccordionTrigger className="px-6 py-4 hover:bg-neutral-50 transition-colors text-left font-semibold text-primary">
                  Nossa Visão
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 border-t border-neutral-100">
                  <p className="py-4">
                    Queremos que cada cliente veja o crédito como um recurso consciente, e não como um problema.<br /> 
                    E queremos que o mercado olhe para a intermediação de crédito com mais exigência, mais transparência e mais impacto real.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <AccordionItem value="valores" className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
                <AccordionTrigger className="px-6 py-4 hover:bg-neutral-50 transition-colors text-left font-semibold text-primary">
                  Nossos Valores
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 border-t border-neutral-100">
                  <ul className="py-4 space-y-2">
                    <li className="flex items-start gap-2">
                      <Check size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span><strong>Ética:</strong> Algum texto</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span><strong>Clareza:</strong> Algum texto</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span><strong>Proximidade:</strong> Algum texto</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span><strong>Compromisso:</strong> Algum texto</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span><strong>Formação:</strong> Algum texto</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  );
}
