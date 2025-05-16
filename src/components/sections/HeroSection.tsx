import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary to-primary/90 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              willChange: 'transform, opacity'
            }}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Especialista em<br />
              <span className="text-secondary">Intermediação de Crédito</span>
            </h1>
            <p className="text-lg text-white/80 max-w">
              Ajudamos a decidir de maneira estratégica, e tornar a literacia financeira um conhecimento acessível, não um privilégio de alguns.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a 
                href="#o-que-fazemos" 
                className="bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 px-8 rounded-full text-sm md:text-base transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Conheça Nossos Serviços
              </motion.a>
              <motion.a 
                href="#estamos-aqui" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold py-3 px-8 rounded-full text-sm md:text-base transition-all border border-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Agende uma Conversa
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative flex lg:block justify-center lg:justify-normal items-end lg:items-baseline"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
              willChange: 'transform, opacity'
            }}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="relative rounded-2xl shadow-2xl w-full aspect-[4/3] overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Especialista em Intermediação de Crédito"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <motion.div 
              className="absolute lg:-bottom-4 lg:left-4 -bottom-4 left-2 bg-white rounded-2xl p-3 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1],
                willChange: 'transform, opacity'
              }}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-500 h-3 w-3 rounded-full"></div>
                <span className="text-primary font-medium">98% de satisfação dos clientes</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
