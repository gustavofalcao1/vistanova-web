"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PartnerLogo } from "@/types";
import { cn } from "@/lib/utils";

interface PartnersProps {
  partners: PartnerLogo[];
}

// Official legal names as required by new regulations
const OFFICIAL_PARTNER_NAMES: Record<string, string> = {
  "cgd": "CAIXA GERAL DE DEPÓSITOS, S.A.",
  "santander": "BANCO SANTANDER TOTTA, S.A.",
  "credibom": "BANCO CREDIBOM, SA",
  "bpi": "BANCO BPI S.A.",
  "abanca": "ABANCA CORPORACIÓN BANCARIA, S.A., SUCURSAL EM PORTUGAL",
  "bancoctt": "BANCO CTT, S.A.",
  "bankinter": "BANKINTER, S.A. - SUCURSAL EM PORTUGAL",
  "eurobic": "BANCO BIC PORTUGUÊS, SA",
  "novobanco": "NOVO BANCO, S.A.",
  "uci": "UNION DE CRÉDITOS INMOBILIÁRIOS, S.A., ESTABLECIMIENTO FINANCIERO DE CRÉDITO (SOCIEDAD UNIPERSONAL) - SUCURSAL EM PORTUGAL",
  "unicre": "UNICRE - INSTITUIÇÃO FINANCEIRA DE CRÉDITO, S.A.",
  "bbva": "BBVA, INSTITUIÇÃO FINANCEIRA DE CRÉDITO S.A."
};

export default function Partners({ partners }: PartnersProps) {
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is only rendered on the client side to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []); // Empty dependency array means this runs once on mount
  
  // Function to get official name from logo path
  const getOfficialName = (logoPath: string): string => {
    const fileName = logoPath.split('/').pop()?.split('.')[0] || '';
    // Remove 'logo-' prefix if present
    const key = fileName.replace('logo-', '');
    return OFFICIAL_PARTNER_NAMES[key] || '';
  };

  // Function to determine the appropriate dimensions and style based on the logo filename
  const getLogoConfig = (logoPath: string) => {
    // Default configuration
    const config = {
      containerClass: "relative w-full h-full",
      imageClass: "object-contain w-auto h-auto",
      width: 200,
      height: 48,
      priority: false,
    };
    
    // Wide logos
    if (logoPath.includes("4finance") || logoPath.includes("bp") || 
        logoPath.includes("cofidis") || logoPath.includes("credibom")) {
      return {
        ...config,
        containerClass: cn(config.containerClass, "max-h-10"),
        width: 160,
        height: 40,
        priority: logoPath.includes("4finance")
      };
    }
    
    // Tall logos
    if (logoPath.includes("cgd") || logoPath.includes("santander") || 
        logoPath.includes("novobanco")) {
      return {
        ...config,
        containerClass: cn(config.containerClass, "max-h-14"),
        height: 56
      };
    }
    
    // Small logos that need to be larger
    if (logoPath.includes("bancoctt") || logoPath.includes("uci") || 
        logoPath.includes("mds") || logoPath.includes("unicre")) {
      return {
        ...config,
        containerClass: cn(config.containerClass, "max-h-12")
      };
    }
    
    return config;
  };

  if (!mounted) {
    return null; // Don't render anything during SSR
  }
  
  return (
    <section 
      id="partners" 
      className="py-16 md:py-24 bg-white"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
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
          <span className="text-primary font-semibold">Bancos e Financeiras</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-primary/90">Nossos Parceiros</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
          <div className="mt-6 text-center">
            <p className="text-md lg:text-sm text-neutral-500">
              Não somos um banco, mas trabalhamos com os principais bancos e instituições financeiras a operar em Portugal.
              <br />
              A VISTA NOVA é independente e analisa cada caso com isenção, para encontrar a melhor solução de crédito para ti, dentro das condições e ofertas dos nossos parceiros.
            </p>
          </div>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-12 px-4">
          {partners.map((partner, index) => {
            const officialName = partner.logo ? getOfficialName(partner.logo) : '';
            
            return (
              <motion.div 
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-gray-100 shadow-sm rounded-lg min-h-[140px] w-[calc(50%-12px)] sm:w-[calc(50%-16px)] md:w-[calc(33.333%-20px)] lg:w-[calc(25%-24px)] xl:w-[calc(20%-26px)] max-w-[220px] transition-all duration-300 hover:bg-gray-200"
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
                  boxShadow: "var(--shadow-card-hover-partners)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Logo Container */}
                <div className="w-full h-16 flex items-center justify-center mb-3">
                  {partner.logo ? (
                    <div className={getLogoConfig(partner.logo).containerClass}>
                      <Image 
                        src={partner.logo} 
                        alt={`${partner.name} - Parceiro bancário da Vista Nova para intermediação de crédito`}
                        fill
                        sizes="(max-width: 768px) 160px, 200px"
                        className={getLogoConfig(partner.logo).imageClass}
                        quality={90}
                        priority={getLogoConfig(partner.logo).priority}
                      />
                    </div>
                  ) : (
                    <span className="text-neutral-400 font-medium text-center">
                      {partner.name}
                    </span>
                  )}
                </div>
                
                {/* Official Name - Required by law */}
                {officialName && (
                  <div className="text-center px-1">
                    <p className="text-xs text-neutral-600 font-medium leading-tight uppercase">
                      {officialName}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}