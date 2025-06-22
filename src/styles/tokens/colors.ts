const colors = {
  // Cores Principais
  primary: {
    DEFAULT: '#0E454E',    // Azul escuro principal
    light: '#1D5D68',       // Tom mais claro do azul principal
    dark: '#0A3239',        // Tom mais escuro do azul principal
    foreground: '#F4F4ED',   // Texto claro em fundo escuro
  },
  
  // Cores de Destaque - Melhoradas para melhor harmonia
  secondary: {
    DEFAULT: '#E5FC2A',    // Verde limão original (para destaques em fundos escuros)
    light: '#F0FD70',       // Verde limão mais suave
    dark: '#D2E925',        // Verde limão escuro
    foreground: '#0E454E',   // Texto escuro em fundo claro
    
    // Variantes para melhor acessibilidade e harmonia
    accessible: '#7A8F02',  // Verde mais escuro - WCAG AA compliant em fundo branco
    vibrant: '#9DB002',     // Verde médio - boa visibilidade
    darker: '#5A6602',      // Verde escuro - máximo contraste
    muted: '#C8E6A0',       // Verde suave - para fundos delicados
    subtle: '#E8F5D0',      // Verde muito suave - para backgrounds
    
    // Variantes contextuais
    onWhite: '#7A8F02',     // Para usar especificamente em fundo branco
    onLight: '#5A6602',     // Para usar em fundos claros
    onDark: '#E5FC2A',      // Para usar em fundos escuros (original)
    
    // Gradientes harmoniosos
    gradient: {
      from: '#9DB002',      // Verde médio
      to: '#7A8F02',        // Verde escuro
    },
  },
  
  // Cores de Fundo
  background: {
    DEFAULT: '#F4F4ED',    // Branco suave
    dark: '#0E454E',        // Azul escuro principal
    alt: '#FFFFFF',         // Branco puro
    'alt-dark': '#1D5D68',  // Tom mais claro do azul principal
    
    // Fundos suaves para melhor harmonia
    subtle: '#FAFAF9',      // Branco muito suave
    accent: '#F8FBF0',      // Fundo com hint de verde
  },
  
  // Cores de Texto
  foreground: {
    DEFAULT: '#0E454E',    // Azul escuro principal
    light: '#888A8C',       // Cinza médio
    dark: '#0A3239',        // Tom mais escuro do azul principal
    onDark: '#F4F4ED',      // Branco suave
    muted: '#888A8C',       // Cinza médio
    
    // Variantes para melhor hierarquia
    primary: '#0E454E',     // Texto principal
    secondary: '#1D5D68',   // Texto secundário
    tertiary: '#888A8C',    // Texto terciário
  },
  
  // Cores de Status
  success: {
    DEFAULT: '#38A169',    // Verde
    light: '#68D391',       // Verde claro
    dark: '#2C7A4D',        // Verde escuro
    foreground: '#F4F4ED',   // Texto claro
  },
  
  warning: {
    DEFAULT: '#DD6B20',    // Âmbar
    light: '#F6AD55',       // Âmbar claro
    dark: '#C05621',        // Âmbar escuro
    foreground: '#0E454E',   // Texto escuro
  },
  
  error: {
    DEFAULT: '#E53E3E',    // Vermelho
    light: '#FC8181',       // Vermelho claro
    dark: '#C53030',        // Vermelho escuro
    foreground: '#F4F4ED',   // Texto claro
  },
  
  // Cores de Borda - Melhoradas
  border: {
    DEFAULT: '#E2E8F0',    // Cinza muito claro
    light: '#F1F5F9',       // Cinza ainda mais claro
    dark: '#888A8C',        // Cinza médio
    secondary: '#C8E6A0',   // Verde suave (em vez do limão vibrante)
    primary: '#0E454E',     // Azul escuro principal
    accent: '#D4E6F1',      // Azul muito claro
  },
  
  // Cores Neutras - Expandidas
  neutral: {
    25: '#FCFCFC',
    50: '#F8F9FA',
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#888A8C',         // Cinza médio
    600: '#6C757D',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
    950: '#0D1117',
  },
  
  // Cores Adicionais
  white: '#FFFFFF',
  black: '#000000',
  
  // Cores de Suporte (para compatibilidade) - Atualizadas
  primaryLight: '#1D5D68',
  primaryDark: '#0A3239',
  secondaryLight: '#F0FD70',
  secondaryDark: '#7A8F02',      // Mudança importante - versão mais escura
  text: '#0E454E',
  textLight: '#888A8C',
  textDark: '#0A3239',
  textOnDark: '#F4F4ED',
  textMuted: '#888A8C',
  backgroundDark: '#0E454E',
  backgroundAlt: '#F4F4ED',
  backgroundAltDark: '#1D5D68',
  
  // Novas cores de suporte para transição
  accent: {
    DEFAULT: '#1D5D68',     // Azul médio
    light: '#2A6B77',       // Azul claro
    dark: '#0E454E',        // Azul escuro
    muted: '#B8CDD9',       // Azul acinzentado
  },
};

export default colors;
