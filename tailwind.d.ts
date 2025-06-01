// Import the ThemeConfig interface specifically for type usage
import type { ThemeConfig } from './src/styles/theme';

declare module 'tailwindcss/colors' {
  export * from 'tailwindcss/colors';
  
  // Extend the default Tailwind colors with your custom colors
  interface Colors {
    primary: {
      DEFAULT: string;
      light: string;
      dark: string;
      foreground: string;
    };
    secondary: {
      DEFAULT: string;
      light: string;
      dark: string;
      foreground: string;
    };
    background: {
      DEFAULT: string;
      dark: string;
      alt: string;
      'alt-dark': string;
    };
    foreground: {
      DEFAULT: string;
      light: string;
      dark: string;
      onDark: string;
      muted: string;
    };
    success: {
      DEFAULT: string;
      light: string;
      dark: string;
      foreground: string;
    };
    warning: {
      DEFAULT: string;
      light: string;
      dark: string;
      foreground: string;
    };
    error: {
      DEFAULT: string;
      light: string;
      dark: string;
      foreground: string;
    };
    border: {
      DEFAULT: string;
      dark: string;
      secondary: string;
      primary: string;
    };
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    white: string;
    black: string;
  }
}

declare module 'tailwindcss/defaultTheme' {
  // Extend Tailwind's defaultTheme to include your full ThemeConfig structure
  export interface DefaultTheme extends ThemeConfig {} // Use ThemeConfig here
}
