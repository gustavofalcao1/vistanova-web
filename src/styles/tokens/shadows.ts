/**
 * Shadow design tokens for Vista Nova
 * Harmonized shadow system for consistent depth and visual hierarchy
 */

export const shadows = {
  // Base elevation shadows
  xs: {
    light: '0 1px 2px 0 rgba(14, 69, 78, 0.05)',
    value: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    css: 'shadow-xs',
  },
  sm: {
    light: '0 1px 3px 0 rgba(14, 69, 78, 0.1), 0 1px 2px -1px rgba(14, 69, 78, 0.1)',
    value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    css: 'shadow-sm',
  },
  md: {
    light: '0 4px 6px -1px rgba(14, 69, 78, 0.1), 0 2px 4px -2px rgba(14, 69, 78, 0.1)',
    value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    css: 'shadow-md',
  },
  lg: {
    light: '0 10px 15px -3px rgba(14, 69, 78, 0.1), 0 4px 6px -4px rgba(14, 69, 78, 0.1)',
    value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    css: 'shadow-lg',
  },
  xl: {
    light: '0 20px 25px -5px rgba(14, 69, 78, 0.1), 0 8px 10px -6px rgba(14, 69, 78, 0.1)',
    value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    css: 'shadow-xl',
  },
  '2xl': {
    light: '0 25px 50px -12px rgba(14, 69, 78, 0.25)',
    value: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    css: 'shadow-2xl',
  },
  
  // Component-specific shadows
  card: {
    default: {
      light: '0 1px 3px 0 rgba(14, 69, 78, 0.1), 0 1px 2px -1px rgba(14, 69, 78, 0.1)',
      value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      css: 'shadow-sm',
    },
    hover: {
      light: '0 10px 15px -3px rgba(14, 69, 78, 0.1), 0 4px 6px -4px rgba(14, 69, 78, 0.1)',
      value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      css: 'shadow-lg',
    },
  },
  
  button: {
    default: {
      light: '0 1px 2px 0 rgba(14, 69, 78, 0.05)',
      value: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      css: 'shadow-xs',
    },
    hover: {
      light: '0 4px 6px -1px rgba(14, 69, 78, 0.1), 0 2px 4px -2px rgba(14, 69, 78, 0.1)',
      value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      css: 'shadow-md',
    },
    active: {
      light: '0 1px 2px 0 rgba(14, 69, 78, 0.1)',
      value: '0 1px 2px 0 rgb(0 0 0 / 0.1)',
      css: 'shadow-sm',
    },
  },
  
  navbar: {
    default: {
      light: '0 4px 6px -1px rgba(14, 69, 78, 0.1), 0 2px 4px -2px rgba(14, 69, 78, 0.1)',
      value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      css: 'shadow-md',
    },
    scrolled: {
      light: '0 10px 15px -3px rgba(14, 69, 78, 0.1), 0 4px 6px -4px rgba(14, 69, 78, 0.1)',
      value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      css: 'shadow-lg',
    },
  },
  
  modal: {
    backdrop: {
      light: '0 25px 50px -12px rgba(14, 69, 78, 0.25)',
      value: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      css: 'shadow-2xl',
    },
  },
  
  // Special effects
  glow: {
    primary: {
      light: '0 0 0 1px rgba(14, 69, 78, 0.1), 0 0 0 4px rgba(14, 69, 78, 0.1)',
      value: '0 0 0 1px rgb(14 69 78 / 0.1), 0 0 0 4px rgb(14 69 78 / 0.1)',
      css: 'ring-4 ring-primary/10',
    },
    secondary: {
      light: '0 0 0 1px rgba(229, 252, 42, 0.2), 0 0 0 4px rgba(229, 252, 42, 0.2)',
      value: '0 0 0 1px rgb(229 252 42 / 0.2), 0 0 0 4px rgb(229 252 42 / 0.2)',
      css: 'ring-4 ring-secondary/20',
    },
  },
  
  // No shadow
  none: {
    light: 'none',
    value: 'none',
    css: 'shadow-none',
  },
};

export default shadows; 