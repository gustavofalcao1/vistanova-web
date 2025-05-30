'use client';

import { useEffect, useState } from 'react';
import { isDarkTheme, toggleTheme as toggleThemeUtil } from '@/styles/utils/theme-utils';

/**
 * Hook para gerenciar o tema da aplicação
 */
export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  // Atualiza o estado quando o componente é montado
  useEffect(() => {
    setIsDark(isDarkTheme());
    setIsMounted(true);
    
    // Adiciona um listener para mudanças no tema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setIsDark(isDarkTheme());
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  /**
   * Alterna entre os temas claro e escuro
   */
  const toggleTheme = () => {
    toggleThemeUtil();
    setIsDark(!isDark);
  };
  
  /**
   * Define o tema para claro
   */
  const setLightTheme = () => {
    if (isDark) toggleTheme();
  };
  
  /**
   * Define o tema para escuro
   */
  const setDarkTheme = () => {
    if (!isDark) toggleTheme();
  };
  
  return {
    isDark,
    isMounted,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
  };
}

export default useTheme;
