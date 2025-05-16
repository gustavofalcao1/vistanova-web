import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";

export default function ImpactSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      className="py-20 px-14 bg-white"
      ref={ref}
    >
      <motion.div
        className="max-w-5xl mx-auto text-center"
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
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-primary leading-tight relative inline-block"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <span className="relative z-10">Quem nos conhece hoje,</span>
          <br />
          <span className="relative z-10">recomenda-nos amanhã.</span>
          <motion.div 
            className="absolute inset-0 bg-secondary/20 -rotate-1 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
        </motion.h2>
        
        <motion.div 
          className="mt-10"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <motion.a 
            href="#estamos-aqui" 
            className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Converse Connosco</span>
            <ArrowRight className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
