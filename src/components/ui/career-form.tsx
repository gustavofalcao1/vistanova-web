'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { motion } from "framer-motion";
import { Upload, X, FileText } from "lucide-react";
import { careerFormSchema, CareerFormValues } from "@/lib/schemas";

interface CareerFormProps {
  onSubmit: (data: any) => Promise<{ success: boolean; error?: unknown }>;
}

export function CareerForm({ onSubmit }: CareerFormProps) {
  const { toast } = useToast();
  const { getRecaptchaToken } = useRecaptcha();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<CareerFormValues>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      motivation: "",
      availability: "",
      linkedin: "",
      consent: false
    }
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Formato inválido",
          description: "Por favor, carrega apenas ficheiros PDF ou Word.",
          variant: "destructive"
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: "Ficheiro muito grande",
          description: "O ficheiro deve ter no máximo 5MB.",
          variant: "destructive"
        });
        return;
      }

      setUploadedFile(file);
      setValue('cv', [file]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setValue('cv', []);
  };

  const handleFormSubmit = async (data: CareerFormValues) => {
    try {
      const recaptchaToken = await getRecaptchaToken('career_form');
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('position', data.position);
      formData.append('experience', data.experience);
      formData.append('motivation', data.motivation);
      formData.append('availability', data.availability);
      formData.append('linkedin', data.linkedin || '');
      formData.append('consent', data.consent.toString());
      formData.append('recaptchaToken', recaptchaToken || '');
      
      if (uploadedFile) {
        formData.append('cv', uploadedFile);
      }
      
      const result = await onSubmit(formData);
      
      if (result.success) {
        toast({
          title: "Candidatura enviada com sucesso!",
          description: "Recebemos a tua candidatura. Entraremos em contacto em breve!",
          variant: "default"
        });
        reset();
        setUploadedFile(null);
      } else {
        toast({
          title: "Erro ao enviar candidatura",
          description: String(result.error) || "Ocorreu um erro. Tenta novamente.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error sending application:', error);
      toast({
        title: "Erro ao enviar candidatura",
        description: "Não foi possível enviar a candidatura. Tenta novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Dados Pessoais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">Nome Completo *</label>
          <input 
            type="text" 
            id="name" 
            className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-400' : 'border-white/20'} bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
            placeholder="O teu nome completo" 
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email *</label>
          <input 
            type="email" 
            id="email" 
            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-white/20'} bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
            placeholder="teu-email@exemplo.com" 
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">Telefone *</label>
          <input 
            type="tel" 
            id="phone" 
            className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-400' : 'border-white/20'} bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
            placeholder="+351 9XX XXX XXX" 
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-white/80 mb-2">LinkedIn (opcional)</label>
          <input 
            type="url" 
            id="linkedin" 
            className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="https://linkedin.com/in/..." 
            {...register("linkedin")}
          />
        </div>
      </div>

      {/* Informações Profissionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-white/80 mb-2">Posição de Interesse *</label>
          <select 
            id="position" 
            className={`w-full px-4 py-3 rounded-lg border ${errors.position ? 'border-red-400' : 'border-white/20'} bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
            {...register("position")}
          >
            <option value="" className="text-gray-800">Seleciona uma opção</option>
            <option value="Especialista de Crédito" className="text-gray-800">Especialista de Crédito</option>
            <option value="Consultor Sénior" className="text-gray-800">Consultor Sénior</option>
            <option value="Posição Júnior" className="text-gray-800">Posição Júnior</option>
            <option value="Estágio" className="text-gray-800">Estágio</option>
            <option value="Outra posição" className="text-gray-800">Outra posição</option>
          </select>
          {errors.position && (
            <p className="text-red-400 text-xs mt-1">{errors.position.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-white/80 mb-2">Experiência em Crédito *</label>
          <select 
            id="experience" 
            className={`w-full px-4 py-3 rounded-lg border ${errors.experience ? 'border-red-400' : 'border-white/20'} bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
            {...register("experience")}
          >
            <option value="" className="text-gray-800">Seleciona uma opção</option>
            <option value="Sem experiência" className="text-gray-800">Sem experiência</option>
            <option value="1-2 anos" className="text-gray-800">1-2 anos</option>
            <option value="3-5 anos" className="text-gray-800">3-5 anos</option>
            <option value="Mais de 5 anos" className="text-gray-800">Mais de 5 anos</option>
          </select>
          {errors.experience && (
            <p className="text-red-400 text-xs mt-1">{errors.experience.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-white/80 mb-2">Disponibilidade *</label>
        <select 
          id="availability" 
          className={`w-full px-4 py-3 rounded-lg border ${errors.availability ? 'border-red-400' : 'border-white/20'} bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
          {...register("availability")}
        >
          <option value="" className="text-gray-800">Seleciona uma opção</option>
                      <option value="Imediata" className="text-gray-800">Imediata</option>
            <option value="2 semanas" className="text-gray-800">2 semanas</option>
            <option value="1 mês" className="text-gray-800">1 mês</option>
            <option value="Flexível" className="text-gray-800">Flexível</option>
        </select>
        {errors.availability && (
          <p className="text-red-400 text-xs mt-1">{errors.availability.message}</p>
        )}
      </div>

      {/* Upload de CV */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Curriculum Vitae *</label>
        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
          {!uploadedFile ? (
            <div>
              <Upload className="h-12 w-12 text-white/50 mx-auto mb-4" />
              <p className="text-white/70 mb-2">Carrega o teu CV</p>
              <p className="text-white/50 text-sm mb-4">PDF ou Word, máximo 5MB</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className="inline-flex items-center px-4 py-2 bg-secondary hover:bg-secondary/90 text-primary font-medium rounded-lg cursor-pointer transition-colors"
              >
                <Upload className="h-4 w-4 mr-2" />
                Escolher Ficheiro
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-secondary mr-3" />
                <div className="text-left">
                  <p className="text-white font-medium">{uploadedFile.name}</p>
                  <p className="text-white/50 text-sm">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-red-400 hover:text-red-300 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        {errors.cv && (
          <p className="text-red-400 text-xs mt-1">{errors.cv.message as string}</p>
        )}
      </div>

      {/* Carta de Motivação */}
      <div>
        <label htmlFor="motivation" className="block text-sm font-medium text-white/80 mb-2">Carta de Motivação *</label>
        <textarea
          id="motivation"
          rows={6}
          className={`w-full px-4 py-3 rounded-lg border ${errors.motivation ? 'border-red-400' : 'border-white/20'} bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
          placeholder="Conta-nos porque queres fazer parte da Vista Nova e o que te motiva..."
          {...register("motivation")}
        />
        {errors.motivation && (
          <p className="text-red-400 text-xs mt-1">{errors.motivation.message}</p>
        )}
      </div>

      {/* Consentimento */}
      <div className="space-y-3">
        <div className="flex items-start">
          <input 
            type="checkbox" 
            id="consent" 
            className={`mt-1 h-4 w-4 text-secondary focus:ring-secondary ${errors.consent ? 'border-red-400' : 'border-white/20'} rounded bg-white/10`}
            {...register("consent")}
          />
          <label htmlFor="consent" className="ml-2 block text-sm text-white/80">
            Concordo com o tratamento dos meus dados pessoais para fins de recrutamento e seleção, conforme a política de privacidade. *
          </label>
        </div>
        {errors.consent && (
          <p className="text-red-400 text-xs">{errors.consent.message}</p>
        )}
      </div>

      <motion.button 
        type="submit" 
        className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-lg"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? "Enviando Candidatura..." : "Enviar Candidatura"}
      </motion.button>
      
      <p className="text-xs text-white/60 text-center">
        * Campos obrigatórios
      </p>
    </form>
  );
}