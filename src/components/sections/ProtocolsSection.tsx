import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Protocol } from "@/types";
import ProtocolItem from "../layouts/Protocol";

interface ProtocolosSectionProps {
  protocols: Protocol[];
}

export default function ProtocolsSection({ protocols }: ProtocolosSectionProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      id="protocols" 
      className="py-16 px-0 bg-primary overflow-hidden"
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
              staggerChildren: 0.1
            }
          }
        }}
      >
        <motion.div 
          className="text-center mb-12"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <span className="text-secondary font-semibold">Entidades</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-white">Protocolos</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
          <div className="mt-6 text-center">
            <p className="text-md lg:text-sm text-white/80">
              Se pertences a uma destas entidades, <strong>tens acesso a condições especiais.</strong>
              <br />
              Estas instituições já confiam na VISTA NOVA.
            </p>
          </div>
        </motion.div>
        
        <div className="overflow-hidden">
          <div className="flex whitespace-nowrap">
            <div className="animate-scroll inline-flex">
              {protocols.map((protocol, index) => (
                <ProtocolItem key={`protocol-${index}`} protocol={protocol} />
              ))}
            </div>
            <div className="animate-scroll inline-flex" aria-hidden="true">
              {protocols.map((protocol, index) => (
                <ProtocolItem key={`protocol-duplicate-${index}`} protocol={protocol} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
