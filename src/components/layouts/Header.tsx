import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { SmoothScrollLink } from "@/components/ui/SmoothScrollLink";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed w-full top-4 z-50 px-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <nav className={`backdrop-blur ${scrolled ? 'bg-white/80' : 'bg-white/70'} rounded-full py-2 sm:py-3 px-4 sm:px-6 shadow-lg flex items-center justify-between transition-all duration-300`}>
          <div className="flex-shrink-0 w-[100px] sm:w-auto">
            <Logo className="w-full max-w-[100px] sm:max-w-[130px]" width={130} />
          </div>
          
          <div className="hidden lg:flex items-center justify-center space-x-4 xl:space-x-8 absolute left-1/2 transform -translate-x-1/2 px-4">
            <SmoothScrollLink to="#about-us" className="text-neutral-800 hover:text-secondary font-medium text-[15px] xl:text-[16px] transition-colors whitespace-nowrap">
              Quem Somos
            </SmoothScrollLink>
            <SmoothScrollLink to="#what-we-do" className="text-neutral-800 hover:text-secondary font-medium text-[15px] xl:text-[16px] transition-colors whitespace-nowrap">
              O Que Fazemos
            </SmoothScrollLink>
            <SmoothScrollLink to="#services" className="text-neutral-800 hover:text-secondary font-medium text-[15px] xl:text-[16px] transition-colors whitespace-nowrap">
              Serviços
            </SmoothScrollLink>
            <SmoothScrollLink to="#partners" className="text-neutral-800 hover:text-secondary font-medium text-[15px] xl:text-[16px] transition-colors whitespace-nowrap">
              Parceiros
            </SmoothScrollLink>
            <SmoothScrollLink to="#work-with-us" className="text-neutral-800 hover:text-secondary font-medium text-[15px] xl:text-[16px] transition-colors whitespace-nowrap">
              Trabalhe Connosco
            </SmoothScrollLink>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SmoothScrollLink 
                to="#where-we-are" 
                className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-base xs:text-sm py-1.5 xs:py-2 px-3 xs:px-4 rounded-full transition-colors whitespace-nowrap inline-block"
              >
                <span className="text-[14px] [@media(max-width:325px)]:text-xs">Fala Connosco</span>
              </SmoothScrollLink>
            </motion.div>
            <button 
              className="lg:hidden text-neutral-800" 
              aria-label="Menu"
              onClick={toggleMobileMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            className="lg:hidden mt-2 bg-white/95 backdrop-blur rounded-2xl shadow-lg p-4 absolute w-[calc(100%-2rem)] left-4 right-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-3">
              <SmoothScrollLink 
                to="#about-us" 
                className="text-neutral-800 hover:text-primary font-medium p-2 transition-colors rounded-lg hover:bg-neutral-100 block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Quem Somos
              </SmoothScrollLink>
              <SmoothScrollLink 
                to="#what-we-do" 
                className="text-neutral-800 hover:text-primary font-medium p-2 transition-colors rounded-lg hover:bg-neutral-100 block"
                onClick={() => setMobileMenuOpen(false)}
              >
                O Que Fazemos
              </SmoothScrollLink>
              <SmoothScrollLink 
                to="#services" 
                className="text-neutral-800 hover:text-primary font-medium p-2 transition-colors rounded-lg hover:bg-neutral-100 block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Serviços
              </SmoothScrollLink>
              <a 
                href="#partners" 
                className="text-neutral-800 hover:text-primary font-medium p-2 transition-colors rounded-lg hover:bg-neutral-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Parceiros
              </a>
              <a 
                href="#where-we-are" 
                className="text-neutral-800 hover:text-primary font-medium p-2 transition-colors rounded-lg hover:bg-neutral-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </a>
              <a 
                href="#where-we-are" 
                className="text-neutral-800 hover:text-primary font-medium p-2 transition-colors rounded-lg hover:bg-neutral-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trabalhe Connosco
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
