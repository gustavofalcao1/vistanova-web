import React from "react";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { OptimizedImage } from "@/components/ui";

// Animation variants for better performance
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.6, 
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const badgeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      delay: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function HeroSection() {
  
  return (
    <LazyMotion features={domAnimation}>
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-12">
            <motion.div 
              className="lg:w-1/2 space-y-8"
              initial="hidden"
              animate="visible"
              variants={textVariants}
              style={{ 
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)' // Force GPU acceleration
              }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Especialista em<br />
                <span className="text-secondary">Intermediação de Crédito</span>
              </h1>
              <p className="text-lg text-white/80 max-w-lg">
                Ajudamos a decidir de maneira estratégica, e tornar a literacia financeira um conhecimento acessível, não um privilégio de alguns.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <motion.a 
                  href="#what-we-do" 
                  className="bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 px-8 rounded-full text-sm md:text-base transition-colors shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  Conheça Nossos Serviços
                </motion.a>
                <motion.a 
                  href="#where-we-are" 
                  className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold py-3 px-8 rounded-full text-sm md:text-base transition-colors border border-white/30"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  Agende uma Conversa
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 relative flex lg:block justify-center lg:justify-normal items-center w-full max-w-md mx-auto lg:max-w-none lg:mx-0"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              style={{ 
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)', // Force GPU acceleration
                position: 'relative'
              }}
            >
              <div className="relative rounded-2xl shadow-2xl w-full aspect-[4/3] overflow-hidden bg-primary/40">
                <OptimizedImage 
                  src="/assets/images/hero.avif"
                  alt="Especialista em Intermediação de Crédito"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover"
                  priority
                  quality={90}
                />
              </div>
              <motion.div 
                className="absolute lg:-bottom-4 lg:-left-4 -bottom-4 left-2 right-0 mx-auto lg:mx-0 lg:-left-8 lg:right-auto bg-white rounded-2xl p-3 shadow-lg w-max max-w-full"
                variants={badgeVariants}
                style={{ 
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)' // Force GPU acceleration
                }}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="bg-green-500 h-2.5 w-2.5 md:h-3 md:w-3 rounded-full flex-shrink-0"></div>
                  <span className="text-primary font-medium text-sm md:text-base">98% de satisfação dos clientes</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
