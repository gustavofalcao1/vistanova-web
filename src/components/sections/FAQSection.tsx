import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ } from "@/lib/types";

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      id="faq" 
      className="py-20 px-14 bg-neutral-100"
      ref={ref}
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
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
          <span className="text-secondary font-semibold">Dúvidas</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-primary">Perguntas Frequentes</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </motion.div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.4,
                    delay: index * 0.1
                  }
                }
              }}
            >
              <AccordionItem value={`faq-${index}`} className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
                <AccordionTrigger className="px-6 py-4 hover:bg-neutral-50 transition-colors text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 border-t border-neutral-100">
                  <p className="py-4">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
