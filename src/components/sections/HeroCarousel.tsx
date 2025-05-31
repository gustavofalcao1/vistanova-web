'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { OptimizedImage } from "@/components/ui";
import { SmoothScrollLink } from "@/components/ui/SmoothScrollLink";

interface HeroSlide {
  id: number;
  title: string;
  highlight: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryLink: string;
  ctaSecondaryLink: string;
  imagePath: string;
  sameLine?: boolean; 
  titleSize?: 'xsmall' | 'small' | 'medium' | 'large';
  highlightSize?: 'xsmall' | 'small' | 'medium' | 'large';
  showSatisfactionBadge?: boolean;
  showCtaButtons?: boolean;
}

// Carousel slides data
const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Especialista em",
    highlight: "Intermediação de Crédito",
    description: "Ajudamos a decidir de maneira estratégica, e tornar a literacia financeira um conhecimento acessível, não um privilégio de alguns.",
    ctaPrimary: "Conhece Nossos Serviços",
    ctaSecondary: "Agenda uma Conversa",
    ctaPrimaryLink: "#what-we-do",
    ctaSecondaryLink: "#contact",
    imagePath: "/assets/images/carousel/1.png",
    sameLine: false,
    titleSize: 'medium',
    highlightSize: 'medium',
    showSatisfactionBadge: true,
    showCtaButtons: true
  },
  {
    id: 2,
    title: "Tratamos-te por ", 
    highlight: '"tu"',
    description: "Não por falta de respeito, mas exatamente porque te respeitamos. O crédito é um tema sério, e acreditamos que a melhor forma de te ajudar, é falar contigo com clareza, proximidade e sem barreiras formais. Somos profissionais, mas também somos humanos. E sabemos que, quando o tema é importante, ouvir alguém que nos fala de forma direta faz toda a diferença.",
    ctaPrimary: "Ver Soluções",
    ctaSecondary: "Falar com Especialista",
    ctaPrimaryLink: "#services",
    ctaSecondaryLink: "#contact",
    imagePath: "/assets/images/carousel/2.png",
    sameLine: true, 
    titleSize: 'medium',
    highlightSize: 'large',
    showSatisfactionBadge: false,
    showCtaButtons: false
  },
  {
    id: 3,
    title: "Crédito Habitação - Garantia Pública",
    highlight: "100% financiado para jovens",
    description: "Agora podes comprar casa sem entrada inicial: o Estado garante até 15% do valor do imóvel para jovens até 35 anos. Válido para imóveis até 450.000€. Medida válida até 31 de dezembro de 2026. Sem entrada inicial, sem IMT, sem Imposto de Selo ao estado, tudo com apoio.",
    ctaPrimary: "Simular Crédito",
    ctaSecondary: "Tire suas Dúvidas",
    ctaPrimaryLink: "#simulator",
    ctaSecondaryLink: "#faq",
    imagePath: "/assets/images/carousel/3.png",
    sameLine: false,
    titleSize: 'xsmall',
    highlightSize: 'small',
    showSatisfactionBadge: false,
    showCtaButtons: false
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
  // Direction is used to track slide direction for potential animation enhancements
  // We'll keep it commented out until implemented in animations
  // const [direction, setDirection] = useState(0);

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run only once on mount

  const nextSlide = () => {
    // setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    // setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? heroSlides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    // setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slide = heroSlides[currentIndex];

  // Handle drag gestures for mobile swipe navigation
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Check if the drag distance is significant enough to trigger a slide change
    if (info.offset.x > 50) {
      // Swiped right, go to previous slide
      prevSlide();
    } else if (info.offset.x < -50) {
      // Swiped left, go to next slide
      nextSlide();
    }
  };

  return (
    <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-primary to-primary/90 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div 
            key={slide.id}
            className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-12 touch-none"
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
            // Mobile swipe gestures
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            // Disable drag on desktop for better UX with buttons
            dragDirectionLock
            whileTap={{ cursor: 'grabbing' }}
          >
            {/* Left Side Content */}
            <motion.div 
              className="lg:w-1/2 space-y-8 touch-auto"
              variants={textVariants}
              style={{ 
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
              // Prevent text selection during drag
              onPointerDown={(e) => e.stopPropagation()}
            >
              <h1 className={`font-bold leading-tight ${
                slide.titleSize === 'xsmall' ? 'text-2xl md:text-3xl' :
                slide.titleSize === 'small' ? 'text-3xl md:text-4xl' : 
                slide.titleSize === 'large' ? 'text-5xl md:text-6xl' : 
                'text-4xl md:text-5xl' // medium
              }`}>
                {slide.sameLine ? (
                  <>
                    {slide.title}
                    <span className="text-secondary">{slide.highlight}</span>
                  </>
                ) : (
                  <>
                    {slide.title}
                    <br />
                    <span className={`text-secondary ${
                      slide.highlightSize === 'xsmall' ? 'text-2xl md:text-3xl' :
                      slide.highlightSize === 'small' ? 'text-3xl md:text-4xl' : 
                      slide.highlightSize === 'large' ? 'text-5xl md:text-6xl' : 
                      'text-4xl md:text-5xl' // medium
                    }`}>
                      {slide.highlight}
                    </span>
                  </>
                )}
              </h1>
              <p className="text-white/80 text-base md:text-lg lg:text-xl mt-4 md:mt-6 lg:mt-8 max-w-2xl mx-auto lg:mx-0">
                {slide.description}
              </p>

              {slide.showCtaButtons !== false && (
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8 lg:mt-10 justify-center lg:justify-start">
                  <SmoothScrollLink 
                    to={slide.ctaPrimaryLink}
                    className="bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 px-6 rounded-full transition-colors text-sm sm:text-base whitespace-nowrap text-center"
                  >
                    {slide.ctaPrimary}
                  </SmoothScrollLink>
                  <SmoothScrollLink 
                    to={slide.ctaSecondaryLink}
                    className="border-2 border-secondary text-secondary hover:bg-secondary/5 font-bold py-3 px-6 rounded-full transition-colors text-sm sm:text-base whitespace-nowrap text-center"
                  >
                    {slide.ctaSecondary}
                  </SmoothScrollLink>
                </div>
              )}
            </motion.div>
            
            {/* Right Side Image */}
            <motion.div 
              className="lg:w-1/2 relative flex lg:block justify-center lg:justify-normal items-center w-full max-w-md mx-auto lg:max-w-none lg:mx-0 touch-auto"
              variants={imageVariants}
              style={{ 
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
              // Prevent image dragging (use parent container drag instead)
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl shadow-2xl w-full aspect-[4/3] overflow-hidden bg-primary/40">
                <OptimizedImage 
                  src={slide.imagePath}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover"
                  priority
                  quality={90}
                />
              </div>
              {slide.showSatisfactionBadge !== false && (
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
              )}
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
