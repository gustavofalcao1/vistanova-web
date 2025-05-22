import colors from '../tokens/colors';
import { space } from '../tokens/space';

export const theme = {
  colors,
  space,
  
  // Typography
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
    monospace: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
  },

  // Layout
  container: {
    maxWidth: '1200px',
    padding: space.md,
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Components
  button: {
    padding: `${space.sm} ${space.lg}`,
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
  },

  // Transitions
  transitions: {
    default: 'all 0.2s ease-in-out',
    fast: 'all 0.1s ease-in-out',
    slow: 'all 0.3s ease-in-out',
  },
};
