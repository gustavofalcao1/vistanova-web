import { theme } from '../theme';

/**
 * Obtém um valor do tema usando um caminho de propriedades aninhadas
 * Exemplo: getThemeValue('colors.primary.default') retorna o valor de theme.colors.primary.default
 */
export const getThemeValue = (path: string, fallback: string = ''): string => {
  try {
    const value = path.split('.').reduce((obj, key) => {
      return obj && obj[key] !== undefined ? obj[key] : undefined;
    }, theme as any);

    return value || fallback;
  } catch (error) {
    console.warn(`[getThemeValue] Invalid theme path: ${path}`, error);
    return fallback;
  }
};

/**
 * Obtém uma cor do tema
 */
export const getColor = (colorPath: string, fallback: string = '#000000'): string => {
  return getThemeValue(`colors.${colorPath}`, fallback);
};

/**
 * Obtém um valor de espaçamento do tema
 */
export const getSpacing = (spacingPath: string, fallback: string = '0'): string => {
  return getThemeValue(`space.${spacingPath}`, fallback);
};

/**
 * Obtém um valor de tipografia do tema
 */
export const getTypography = (key: string, fallback: string = '') => {
  return getThemeValue(`typography.${key}`, fallback);
};

/**
 * Obtém um valor de breakpoint do tema
 */
export const getBreakpoint = (key: string, fallback: string = '0px'): string => {
  return getThemeValue(`breakpoints.${key}`, fallback);
};

/**
 * Verifica se o tema atual é o tema escuro
 */
export const isDarkTheme = (): boolean => {
  return document.documentElement.classList.contains('dark');
};

/**
 * Alterna entre temas claro e escuro
 */
export const toggleTheme = (): void => {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

/**
 * Aplica o tema salvo no localStorage ou o tema do sistema
 */
export const applySavedTheme = (): void => {
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    if (savedTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};

/**
 * Gera variáveis CSS para o tema atual
 */
export const generateThemeVariables = (): Record<string, string> => {
  const vars: Record<string, string> = {};
  
  // Função auxiliar para percorrer objetos aninhados
  const processObject = (obj: Record<string, any>, prefix = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const varName = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
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
  processObject(theme.typography, 'typography');
  
  // Processa os breakpoints
  processObject(theme.breakpoints, 'breakpoint');
  
  return vars;
};

/**
 * Aplica as variáveis CSS do tema ao documento
 */
export const applyThemeVariables = (): void => {
  const root = document.documentElement;
  const themeVars = generateThemeVariables();
  
  Object.entries(themeVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};
