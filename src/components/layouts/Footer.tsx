import React from "react";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-xl mb-4">
              <span className="text-secondary">me </span>VISTA NOVA
            </h3>
            <p className="text-white/80 mb-4">
              Especialista em Intermediação de Crédito.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Páginas</h4>
            <ul className="space-y-2">
              <li><a href="#about-us" className="text-white/80 hover:text-secondary transition-colors">Quem Somos</a></li>
              <li><a href="#what-we-do" className="text-white/80 hover:text-secondary transition-colors">O Que Fazemos</a></li>
              <li><a href="#services" className="text-white/80 hover:text-secondary transition-colors">Serviços</a></li>
              <li><a href="#partners" className="text-white/80 hover:text-secondary transition-colors">Parceiros</a></li>
              <li><a href="#where-we-are" className="text-white/80 hover:text-secondary transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-secondary transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-white/80 hover:text-secondary transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-white/80 hover:text-secondary transition-colors">Política de Cookies</a></li>
              <li><a href="#" className="text-white/80 hover:text-secondary transition-colors">RGPD</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 text-secondary" />
                <span className="text-white/80">Rua da Bélgica, 113434–H<br />4400-209 Vila Nova de Gaia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0 text-secondary" />
                <span className="text-white/80">+351 22 375 06 02</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0 text-secondary" />
                <span className="text-white/80">info@vistanova.pt</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} VISTA NOVA. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
