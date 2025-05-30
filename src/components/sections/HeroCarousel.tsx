'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OptimizedImage } from "@/components/ui";

// Carousel slides data
const heroSlides = [
  {
    id: 1,
    title: "Especialista em",
    highlight: "Intermediação de Crédito",
    description: "Ajudamos a decidir de maneira estratégica, e tornar a literacia financeira um conhecimento acessível, não um privilégio de alguns.",
    ctaPrimary: "Conheça Nossos Serviços",
    ctaSecondary: "Agende uma Conversa",
    ctaPrimaryLink: "#what-we-do",
    ctaSecondaryLink: "#where-we-are"
  },
  {
    id: 2,
    title: "Soluções Financeiras",
    highlight: "Personalizadas",
    description: "Oferecemos as melhores opções de crédito do mercado, com taxas competitivas e condições especiais para você.",
    ctaPrimary: "Ver Soluções",
    ctaSecondary: "Falar com Especialista",
    ctaPrimaryLink: "#services",
    ctaSecondaryLink: "#contact"
  },
  {
    id: 3,
    title: "Realize Seus Sonhos",
    highlight: "Com Crédito Consciente",
    description: "Conte com nossa assessoria especializada para realizar seus projetos com segurança e tranquilidade.",
    ctaPrimary: "Simular Crédito",
    ctaSecondary: "Tire suas Dúvidas",
    ctaPrimaryLink: "#simulator",
    ctaSecondaryLink: "#faq"
  }
];

// Animation variants from original HeroSection
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

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-avançar os slides
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 8000); // Muda a cada 8 segundos
    
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? heroSlides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slide = heroSlides[currentIndex];

  return (
    <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-primary to-primary/90 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div 
            key={slide.id}
            className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-12"
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
          >
            {/* Left Side Content */}
            <motion.div 
              className="lg:w-1/2 space-y-8"
              variants={textVariants}
              style={{ 
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {slide.title}<br />
                <span className="text-secondary">{slide.highlight}</span>
              </h1>
              <p className="text-lg text-white/80 max-w-lg">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <motion.a 
                  href={slide.ctaPrimaryLink}
                  className="bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 px-8 rounded-full text-sm md:text-base transition-colors shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  {slide.ctaPrimary}
                </motion.a>
                <motion.a 
                  href={slide.ctaSecondaryLink}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold py-3 px-8 rounded-full text-sm md:text-base transition-colors border border-white/30"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  {slide.ctaSecondary}
                </motion.a>
              </div>
            </motion.div>
            
            {/* Right Side Image */}
            <motion.div 
              className="lg:w-1/2 relative flex lg:block justify-center lg:justify-normal items-center w-full max-w-md mx-auto lg:max-w-none lg:mx-0"
              variants={imageVariants}
              style={{ 
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
            >
              <div className="relative rounded-2xl shadow-2xl w-full aspect-[4/3] overflow-hidden bg-primary/40">
                <OptimizedImage 
                  src="/assets/images/hero.avif"
                  alt={slide.title}
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
                  transform: 'translateZ(0)'
                }}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="bg-green-500 h-2.5 w-2.5 md:h-3 md:w-3 rounded-full flex-shrink-0"></div>
                  <span className="text-primary font-medium text-sm md:text-base">98% de satisfação dos clientes</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-secondary w-8' : 'bg-white/40 w-3'
                }`}
                aria-label={`Ir para o slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/20 transition-colors z-20 hidden md:block"
          aria-label="Slide anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/20 transition-colors z-20 hidden md:block"
          aria-label="Próximo slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
