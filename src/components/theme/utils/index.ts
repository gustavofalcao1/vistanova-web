import { ThemeConfig } from '@/styles/theme';

/**
 * Gets a value from the theme using a nested property path
 * Example: getThemeValue(theme, 'colors.primary') returns the value of theme.colors.primary
 */
export function getThemeValue<T = any>(
  theme: ThemeConfig,
  path: string,
  fallback?: T
): T | undefined {
  try {
    return path.split('.').reduce((obj, key) => {
      return obj && obj[key] !== undefined ? obj[key] : undefined;
    }, theme as any) as T;
  } catch (error) {
    console.warn(`[getThemeValue] Invalid theme path: ${path}`, error);
    return fallback;
  }
}

/**
 * Gets a color from the theme
 */
export function getColor(theme: ThemeConfig, colorPath: string, fallback: string = '#000000'): string {
  return getThemeValue(theme, `colors.${colorPath}`, fallback) as string;
}

/**
 * Gets a spacing value from the theme
 */
export function getSpacing(theme: ThemeConfig, spacingPath: string, fallback: string = '0'): string {
  return getThemeValue(theme, `space.${spacingPath}`, fallback) as string;
}

/**
 * Gets a typography value from the theme
 */
export function getTypography(theme: ThemeConfig, key: string, fallback: string | number | Record<string, unknown> = '') {
  return getThemeValue(theme, `typography.${key}`, fallback);
}

/**
 * Gets a breakpoint value from the theme
 */
export function getBreakpoint(theme: ThemeConfig, key: string, fallback: string = '0px'): string {
  return getThemeValue(theme, `breakpoints.${key}`, fallback) as string;
}

/**
 * Checks if the current theme is the dark theme
 */
export function isDarkTheme(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

/**
 * Toggles between light and dark themes
 */
export function toggleTheme(): void {
  if (typeof document === 'undefined') return;
  
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  
  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch (error) {
    console.warn('Failed to save theme preference to localStorage', error);
  }
}

/**
 * Applies the saved theme from localStorage or the system theme
 */
export function applySavedTheme(): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  
  const html = document.documentElement;
  let theme: string | null = null;
  
  try {
    theme = localStorage.getItem('theme');
  } catch (error) {
    console.warn('Failed to read theme from localStorage', error);
  }
  
  if (theme === 'dark') {
    html.classList.add('dark');
  } else if (theme === 'light') {
    html.classList.remove('dark');
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

/**
 * Generates CSS variables for the current theme
 */
export function generateThemeVariables(theme: ThemeConfig): Record<string, string> {
  const vars: Record<string, string> = {};
  
  // Função auxiliar para percorrer objetos aninhados
  const processObject = (obj: Record<string, any>, prefix = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const varName = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        processObject(value, varName);
      } else if (typeof value === 'string' || typeof value === 'number') {
        vars[`--${varName}`] = String(value);
      }
    });
  };
  
  // Processa as cores
  processObject(theme.colors, 'color');
  
  // Processa os espaçamentos
  processObject(theme.space, 'space');
  
  // Processa a tipografia
  processObject(theme.typography, 'font');
  
  // Processa os breakpoints
  processObject(theme.breakpoints, 'breakpoint');
  
  // Processa os raios de borda
  processObject(theme.borderRadius, 'radius');
  
  // Processa as sombras
  processObject(theme.boxShadow, 'shadow');
  
  // Processa as transições
  processObject(theme.transition, 'transition');
  
  // Processa as camadas de z-index
  processObject(theme.zIndex, 'z');
  
  return vars;
}

/**
 * Applies the theme's CSS variables to the document
 */
export function applyThemeVariables(theme: ThemeConfig): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  const themeVars = generateThemeVariables(theme);
  
  Object.entries(themeVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
