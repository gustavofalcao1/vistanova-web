import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Service } from "@/lib/types";
import { 
  House, RefreshCw, PiggyBank, Car, 
  HandCoins, HardHat, Hammer, MapPinned, CreditCard 
} from "lucide-react";

interface ServicosSectionProps {
  services: Service[];
}

export default function ServicosSection({ services }: ServicosSectionProps) {
  const { ref, isVisible } = useScrollReveal();

  const getIcon = (iconName: string) => {
    const props = { className: "h-6 w-6 text-primary" };
    switch (iconName) {
      case "House": return <House {...props} />;
      case "RefreshCw": return <RefreshCw {...props} />;
      case "PiggyBank": return <PiggyBank {...props} />;
      case "Car": return <Car {...props} />;
      case "HandCoins": return <HandCoins {...props} />;
      case "HardHat": return <HardHat {...props} />;
      case "Hammer": return <Hammer {...props} />;
      case "MapPinned": return <MapPinned {...props} />;
      case "CreditCard": return <CreditCard {...props} />;
      default: return <PiggyBank {...props} />;
    }
  };

  return (
    <section 
      id="services" 
      className="py-20 px-14 bg-primary"
      ref={ref}
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
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
          <span className="text-secondary font-semibold">Como Podemos Ajudar</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-white">Nossos Serviços</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card bg-white rounded-xl p-6 shadow-sm hover:shadow-lg"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.5,
                    delay: index * 0.1
                  }
                }
              }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                {getIcon(service.icon)}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-neutral-700">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
