"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PartnerLogo } from "@/types";
import { cn } from "@/lib/utils";

interface PartnersProps {
  partners: PartnerLogo[];
}

export default function Partners({ partners }: PartnersProps) {
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is only rendered on the client
  useEffect(() => {
    setMounted(true);
  }, []);
  
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
      id="parceiros" 
      className="py-20 px-14 bg-background"
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
          <span className="text-secondary font-semibold">Colaboradores</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-primary/90">Nossos Parceiros</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 mt-12">
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              className="flex items-center justify-center p-5 bg-gray-100 shadow-sm rounded-lg h-24 transition-all duration-300 hover:bg-gray-200"
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
              <div className="w-full h-full flex items-center justify-center p-2">
                {partner.logo ? (
                  <div className={getLogoConfig(partner.logo).containerClass}>
                    <Image 
                      src={partner.logo} 
                      alt={partner.name} 
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}