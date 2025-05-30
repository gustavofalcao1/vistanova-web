const colors = {
  // Cores Principais
  primary: {
    DEFAULT: '#0E454E',    // Azul escuro principal
    light: '#1D5D68',       // Tom mais claro do azul principal
    dark: '#0A3239',        // Tom mais escuro do azul principal
    foreground: '#F4F4ED',   // Texto claro em fundo escuro
  },
  
  // Cores de Destaque
  secondary: {
    DEFAULT: '#E5FC2A',    // Verde limão
    light: '#EBFD5E',       // Verde limão claro
    dark: '#D2E925',        // Verde limão escuro
    foreground: '#0E454E',   // Texto escuro em fundo claro
  },
  
  // Cores de Fundo
  background: {
    DEFAULT: '#F4F4ED',    // Branco suave
    dark: '#0E454E',        // Azul escuro principal
    alt: '#FFFFFF',         // Branco puro
    'alt-dark': '#1D5D68',  // Tom mais claro do azul principal
  },
  
  // Cores de Texto
  foreground: {
    DEFAULT: '#0E454E',    // Azul escuro principal
    light: '#888A8C',       // Cinza médio
    dark: '#0A3239',        // Tom mais escuro do azul principal
    onDark: '#F4F4ED',      // Branco suave
    muted: '#888A8C',       // Cinza médio
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
  
  // Cores de Borda
  border: {
    DEFAULT: '#E2E8F0',    // Cinza muito claro
    dark: '#888A8C',         // Cinza médio
    secondary: '#E5FC2A',    // Verde limão
    primary: '#0E454E',      // Azul escuro principal
  },
  
  // Cores Neutras
  neutral: {
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
  },
  
  // Cores Adicionais
  white: '#FFFFFF',
  black: '#000000',
  
  // Cores de Suporte (para compatibilidade)
  primaryLight: '#1D5D68',
  primaryDark: '#0A3239',
  secondaryLight: '#EBFD5E',
  secondaryDark: '#D2E925',
  text: '#0E454E',
  textLight: '#888A8C',
  textDark: '#0A3239',
  textOnDark: '#F4F4ED',
  textMuted: '#888A8C',
  backgroundDark: '#0E454E',
  backgroundAlt: '#F4F4ED',
  backgroundAltDark: '#1D5D68',
};

export default colors;
