import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PartnerLogo } from "@/types";

interface ParceirosSectionProps {
  partners: PartnerLogo[];
}

export default function ParceirosSection({ partners }: ParceirosSectionProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      id="parceiros" 
      className="py-20 px-14 bg-background"
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
          className="text-center mb-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <span className="text-secondary font-semibold">Colaboradores</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-white">Nossos Parceiros</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              className="flex items-center justify-center p-4 bg-neutral-100 rounded-lg h-24"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 0.3,
                    delay: index * 0.05
                  }
                }
              }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                {partner.logo ? (
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    width={200}  // max-w-full
                    height={48}  // max-h-12
                    className="w-auto h-auto"
                  />
                ) : (
                  <span className="text-neutral-400 font-medium">{partner.name}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
