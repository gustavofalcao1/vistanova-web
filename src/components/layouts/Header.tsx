import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
      <div className="max-w-7xl mx-auto">
        <nav className={`backdrop-blur ${scrolled ? 'bg-white/80' : 'bg-white/70'} rounded-full py-3 px-6 shadow-lg flex items-center justify-between transition-all duration-300`}>
          <div className="flex items-center">
            <a href="#" className="font-bold md:text-xl text-xs sm:text-[0.5rem] text-primary mr-8">
              <span className="text-secondary">me </span>VISTA NOVA
            </a>
          </div>
          
          <div className="hidden lg:flex items-center justify-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <a href="#about-us" className="text-neutral-800 hover:text-secondary font-medium text-md transition-colors">
              Quem Somos
            </a>
            <a href="#what-we-do" className="text-neutral-800 hover:text-secondary font-medium text-md transition-colors">
              O Que Fazemos
            </a>
            <a href="#services" className="text-neutral-800 hover:text-secondary font-medium text-md transition-colors">
              Serviços
            </a>
            <a href="#partners" className="text-neutral-800 hover:text-secondary font-medium text-md transition-colors">
              Parceiros
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.a 
              href="#where-we-are" 
              className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-sm py-2 px-4 rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Fale Conosco
            </motion.a>
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
              <a 
                href="#about-us" 
                className="text-neutral-800 hover:text-primary font-medium p-2 transition-colors rounded-lg hover:bg-neutral-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Quem Somos
              </a>
              <a 
                href="#what-we-do" 
                className="text-neutral-800 hover:text-primary font-medium p-2 transition-colors rounded-lg hover:bg-neutral-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                O Que Fazemos
              </a>
              <a 
                href="#services" 
                className="text-neutral-800 hover:text-primary font-medium p-2 transition-colors rounded-lg hover:bg-neutral-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Serviços
              </a>
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
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
