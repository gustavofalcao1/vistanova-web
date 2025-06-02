'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { PageLink } from "@/components/ui/page-link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Effect to handle header background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Add background when scrolled past threshold
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup function to remove event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array means this effect runs once on mount

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed w-full top-4 z-50 px-0 sm:px-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <nav className={`backdrop-blur ${scrolled ? 'bg-white/80' : 'bg-white/70'} rounded-full py-2 sm:py-3 px-4 sm:px-6 shadow-lg flex items-center justify-between transition-all duration-300`}>
          <div className="flex-shrink-0 w-auto">
            <Logo className="w-full max-w-[120px] [@media(min-width:426px)]:max-w-[220px]" width={220} />
          </div>
          
          <div className="hidden xl:flex items-center justify-center space-x-4 xl:space-x-8 absolute left-1/2 transform -translate-x-1/2 px-4">
            <PageLink to="#about-us" className="text-neutral-800 hover:text-secondary font-medium text-[15px] xl:text-[16px] transition-colors whitespace-nowrap">
              Quem Somos
            </PageLink>
            <PageLink to="#what-we-do" className="text-neutral-800 hover:text-secondary font-medium text-[15px] xl:text-[16px] transition-colors whitespace-nowrap">
              O Que Fazemos
            </PageLink>
            <PageLink to="#services" className="text-neutral-800 hover:text-secondary font-medium text-[15px] xl:text-[16px] transition-colors whitespace-nowrap">
              Serviços
            </PageLink>
            <PageLink to="#partners" className="text-neutral-800 hover:text-secondary font-medium text-[15px] xl:text-[16px] transition-colors whitespace-nowrap">
              Parceiros
            </PageLink>
            <PageLink to="/trabalha-connosco" className="text-neutral-800 hover:text-secondary font-medium text-[15px] xl:text-[16px] transition-colors whitespace-nowrap">
              Trabalha Connosco
            </PageLink>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PageLink 
                to="#contact" 
                className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-base xs:text-sm py-1.5 xs:py-2 px-3 xs:px-4 rounded-full transition-colors whitespace-nowrap inline-block"
              >
                <span className="text-[14px] [@media(max-width:325px)]:text-[12px]">Fala Connosco</span>
              </PageLink>
            </motion.div>
            <button 
              className="xl:hidden text-neutral-800" 
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
            className="xl:hidden mt-2 bg-white/95 backdrop-blur rounded-2xl shadow-lg p-4 absolute w-[calc(100%-2rem)] left-4 right-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-3">
              <PageLink 
                to="#about-us" 
                className="text-neutral-800 hover:text-primary font-medium p-2 transition-colors rounded-lg hover:bg-neutral-100 block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Quem Somos
              </PageLink>
              <PageLink 
                to="#what-we-do" 
                className="text-neutral-800 hover:text-primary font-medium p-2 transition-colors rounded-lg hover:bg-neutral-100 block"
                onClick={() => setMobileMenuOpen(false)}
              >
                O Que Fazemos
              </PageLink>
              <PageLink 
                to="#services" 
                className="text-neutral-800 hover:text-primary font-medium p-2 transition-colors rounded-lg hover:bg-neutral-100 block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Serviços
              </PageLink>
              <PageLink 
                to="#partners" 
                className="text-neutral-800 hover:text-primary font-medium p-2 transition-colors rounded-lg hover:bg-neutral-100 block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Parceiros
              </PageLink>
              <PageLink 
                to="#contact" 
                className="text-neutral-800 hover:text-primary font-medium p-2 transition-colors rounded-lg hover:bg-neutral-100 block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </PageLink>
              <PageLink 
                to="/trabalha-connosco" 
                className="text-neutral-800 hover:text-primary font-medium p-2 transition-colors rounded-lg hover:bg-neutral-100 block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trabalha Connosco
              </PageLink>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
