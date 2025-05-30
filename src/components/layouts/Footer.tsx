'use client';

import React from "react";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { PageLink } from "@/components/ui/PageLink";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 px-4">
      <style jsx>{`
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 40% 20% 20% 20%;
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 footer-grid gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="mb-4 w-[250px]">
              <Logo variant="white" width={250} />
            </div>
            <p className="text-white/80 mb-4">
              Especialista em Intermediação de Crédito.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/vista.nova.pt/" target="_blank" className="text-white hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/vista_nova_/" target="_blank" className="text-white hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/vistanova-intermediariocredito/" target="_blank" className="text-white hover:text-secondary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Páginas</h4>
            <ul className="space-y-2">
              <li><PageLink to="#about-us" className="text-white/80 hover:text-secondary transition-colors block py-1">Quem Somos</PageLink></li>
              <li><PageLink to="#what-we-do" className="text-white/80 hover:text-secondary transition-colors block py-1">O Que Fazemos</PageLink></li>
              <li><PageLink to="#services" className="text-white/80 hover:text-secondary transition-colors block py-1">Serviços</PageLink></li>
              <li><PageLink to="#partners" className="text-white/80 hover:text-secondary transition-colors block py-1">Parceiros</PageLink></li>
              <li><a href="/trabalha-connosco" className="text-white/80 hover:text-secondary transition-colors block py-1">Trabalha Connosco</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/politica-de-privacidade" className="text-white/80 hover:text-secondary transition-colors">Política de Privacidade</a></li>
              <li><a href="/aviso-de-privacidade" className="text-white/80 hover:text-secondary transition-colors">Aviso de Privacidade</a></li>
              <li><a href="/politica-de-cookies" className="text-white/80 hover:text-secondary transition-colors">Política de Cookies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 text-secondary" />
                <a href="https://maps.app.goo.gl/EM3Bo6LFMfE3uiVUA" target="_blank" className="text-white/80">Rua da Bélgica, 3434–H<br />4400-209 Vila Nova de Gaia</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0 text-secondary" />
                <a href="tel:+351223750602" className="text-white/80">+351 22 375 06 02</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0 text-secondary" />
                <a href="mailto:geral@vistanova.pt" className="text-white/80">geral@vistanova.pt</a>
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
