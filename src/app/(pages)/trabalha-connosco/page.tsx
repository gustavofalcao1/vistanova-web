'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  mensagem: string;
  curriculo: File | null;
};

export default function TrabalhaConosco() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    mensagem: '',
    curriculo: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (e.target.type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: fileInput.files ? fileInput.files[0] : null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Aqui você pode adicionar a lógica para enviar o formulário
      // Por exemplo, usando fetch para uma API ou um serviço de formulário
      
      // Simulando um envio assíncrono
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Resetar o formulário
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cargo: '',
        mensagem: '',
        curriculo: null,
      });
      
      // Resetar o input de arquivo
      const fileInput = document.getElementById('curriculo') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      
      toast({
        title: 'Candidatura enviada!',
        description: 'Obrigado pelo seu interesse em fazer parte da nossa equipe. Entraremos em contato em breve.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error sending job application:', error);
      toast({
        title: 'Erro ao enviar candidatura',
        description: 'Ocorreu um erro ao processar a tua candidatura. Por favor, tenta novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">Trabalha Conosco</h1>
        <p className="text-xl text-gray-600">
          Junte-se à nossa equipe de especialistas em crédito e ajude-nos a transformar sonhos em realidade.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-lg shadow-md p-8 mb-12"
      >
        <h2 className="text-2xl font-semibold text-primary mb-6">Por que trabalhar na Vista Nova?</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 h-6 w-6 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Oportunidades de crescimento</h3>
                <p className="text-gray-600 text-sm">Invistimos no desenvolvimento profissional da nossa equipe.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 h-6 w-6 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Ambiente de trabalho dinâmico</h3>
                <p className="text-gray-600 text-sm">Um local onde suas ideias são valorizadas.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 h-6 w-6 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Benefícios competitivos</h3>
                <p className="text-gray-600 text-sm">Pacote de benefícios atrativo para todos os colaboradores.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 h-6 w-6 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Propósito inspirador</h3>
                <p className="text-gray-600 text-sm">Trabalha em algo que realmente faz a diferença na vida das pessoas.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg shadow-md p-8"
      >
        <h2 className="text-2xl font-semibold text-primary mb-6">Envie sua candidatura</h2>
        <p className="text-gray-600 mb-8">
          Preencha o formulário abaixo para se candidatar a uma vaga na nossa equipe. Analisaremos seu perfil e entraremos em contato caso haja uma oportunidade compatível.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo *</Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                required
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome completo"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone *</Label>
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                required
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cargo">Cargo de interesse</Label>
              <Input
                id="cargo"
                name="cargo"
                type="text"
                value={formData.cargo}
                onChange={handleChange}
                placeholder="Ex: Consultor de Crédito"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem</Label>
            <Textarea
              id="mensagem"
              name="mensagem"
              rows={4}
              value={formData.mensagem}
              onChange={handleChange}
              placeholder="Conte-nos por que você gostaria de fazer parte da nossa equipe..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="curriculo">Currículo (PDF ou DOCX, máximo 5MB) *</Label>
            <Input
              id="curriculo"
              name="curriculo"
              type="file"
              required
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500">Anexe seu currículo em formato PDF ou DOCX</p>
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Candidatura'}
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            Ao enviar este formulário, você concorda com nossa Política de Privacidade e com o processamento dos seus dados para fins de recrutamento.
          </p>
        </form>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 bg-primary/5 rounded-lg p-8 text-center"
      >
        <h3 className="text-xl font-semibold text-primary mb-4">Não encontrou uma vaga adequada?</h3>
        <p className="text-gray-600 mb-6">
          Envie-nos o seu currículo mesmo assim! Estamos sempre em busca de talentos excepcionais.
        </p>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
          Cadastrar Currículo
        </Button>
      </motion.div>
    </div>
  );
}
