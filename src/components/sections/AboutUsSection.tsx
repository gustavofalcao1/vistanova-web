import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Check } from "lucide-react";

export default function QuemSomosSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      id="about-us" 
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
          <span className="text-primary font-semibold">Conhece-nos</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-primary">Quem Somos</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <p className="text-lg text-neutral-800 text-center mb-2 font-bold">
            Somos a VISTA NOVA.
          </p>
          <p className="text-lg text-neutral-800 text-center mb-2">
            Durante 17 anos, ajudámos centenas de pessoas a tomarem decisões com mais clareza. Somos Intermediários de Crédito Vinculados, registados no Banco de Portugal, com o n.º 0002543.
          </p>
          <p className="text-lg text-neutral-800 text-center mb-12 font-semibold">
            Ajudamos os nossos clientes a decidirem melhor… e a viver melhor!
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
                  Missão
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 border-t border-neutral-100">
                  <p className="py-4">
                    A nossa missão é para contigo. Garantir que contrates e giras o teu crédito de forma mais consciente, com apoio em cada passo, com acesso a informações claras e de literacia financeira, que ajudam a transformar decisões e vidas.
                  </p>
                  <p className="pb-4 font-semibold">
                    A literacia financeira não pode continuar a ser um privilégio só de alguns, tem de ser uma base para todos.
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
                  Visão
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 border-t border-neutral-100">
                  <p className="py-4">
                    Queremos que deixes de ver o Crédito, como um problema e que passes a vê-lo como uma ferramenta. Um recurso. Um caminho.
                    <br /> <br />
                    Queremos que o mercado olhe para a Intermediação de Crédito com mais exigência, mais transparência e mais impacto real.
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
                  Valores
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 border-t border-neutral-100">
                  <ul className="py-4 space-y-2">
                    <li className="flex items-start gap-2">
                      <Check size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span><strong>Ética:</strong> sempre</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span><strong>Clareza:</strong> sem rodeios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span><strong>Proximidade:</strong> verdadeira e constante</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span><strong>Compromisso:</strong> inabalável</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span><strong>Formação:</strong> contínua</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <span><strong>Segurança:</strong> imprescindível</span>
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
