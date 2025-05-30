'use client';

import { ReactNode, useEffect } from 'react';
import { ThemeConfig } from '@/styles/theme';
import { applySavedTheme, applyThemeVariables } from './utils';
import theme from '@/styles/theme';

export interface ThemeProviderProps {
  /** Content that will have access to the theme */
  children: ReactNode;
  
  /** Default theme to be applied */
  defaultTheme?: 'light' | 'dark' | 'system';
  
  /** Custom theme settings */
  theme?: Partial<ThemeConfig>;
  
  /** Whether to apply CSS variables for the theme */
  applyCSSVars?: boolean;
  
  /** Class to be applied to the root element */
  className?: string;
  
  /** Style to be applied to the root element */
  style?: React.CSSProperties;
}

/**
 * Theme provider that manages the application's theme
 * 
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  theme: themeOverrides,
  applyCSSVars = true,
  className,
  style,
}: ThemeProviderProps) {
  useEffect(() => {
    // Apply saved theme or system theme
    applySavedTheme();
    
    // Apply theme CSS variables
    if (applyCSSVars && themeOverrides) {
      applyThemeVariables({
        ...theme,
        ...themeOverrides,
      });
    } else if (applyCSSVars) {
      applyThemeVariables(theme);
    }
    
    // Adiciona um listener para mudanças na preferência de cor do sistema
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applySavedTheme();
      
      mediaQuery.addEventListener('change', handleChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, [applyCSSVars, themeOverrides]);
  
  return (
    <div 
      className={className}
      style={style}
      data-theme={defaultTheme === 'system' ? undefined : defaultTheme}
    >
      {children}
    </div>
  );
}

export default ThemeProvider;
