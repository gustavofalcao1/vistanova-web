/** @type {import('tailwindcss').Config} */
import colors from './src/styles/tokens/colors.ts'; // Kept as .ts as per user confirmation
import shadows from './src/styles/tokens/shadows.ts';

// Flatten color tokens for Tailwind, to be used under the 'vn' namespace
const flattenColors = (colorObj, prefix = '') => {
  return Object.keys(colorObj).reduce((acc, key) => {
    const value = colorObj[key];
    const newKey = prefix ? `${prefix}-${key}` : key;
    
    // If the value is an object and does not have a DEFAULT key, recurse
    if (typeof value === 'object' && value !== null && !('DEFAULT' in value)) {
      return { ...acc, ...flattenColors(value, newKey) };
    }
    
    // Replace '-DEFAULT' suffix with an empty string for the key
    return { ...acc, [newKey.replace(/-DEFAULT$/, '')]: value };
  }, {});
};

// Get flattened colors for Tailwind 'vn' namespace
const vnTokenColors = flattenColors(colors);

// Simplified shadow mapping to avoid recursion issues
const vnShadows = {
  // Use CSS variables instead of complex flattening
  'xs': 'var(--shadow-xs)',
  'sm': 'var(--shadow-sm)', 
  'md': 'var(--shadow-md)',
  'lg': 'var(--shadow-lg)',
  'xl': 'var(--shadow-xl)',
  '2xl': 'var(--shadow-2xl)',
  'card-default': 'var(--shadow-card-default)',
  'card-hover': 'var(--shadow-card-hover)',
  'button-default': 'var(--shadow-button-default)',
  'button-hover': 'var(--shadow-button-hover)',
  'navbar-default': 'var(--shadow-navbar-default)',
  'navbar-scrolled': 'var(--shadow-navbar-scrolled)',
  'modal-backdrop': 'var(--shadow-modal-backdrop)',
};

const config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // If using old pages dir
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // For App Router
  ],
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: true,
    purgeLayersByDefault: true,
  },
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        // Harmonized shadow system
        'vn-xs': 'var(--shadow-xs)',
        'vn-sm': 'var(--shadow-sm)',
        'vn-md': 'var(--shadow-md)',
        'vn-lg': 'var(--shadow-lg)',
        'vn-xl': 'var(--shadow-xl)',
        'vn-2xl': 'var(--shadow-2xl)',
        
        // Component-specific shadows
        'vn-card': 'var(--shadow-card-default)',
        'vn-card-hover': 'var(--shadow-card-hover)',
        'vn-button': 'var(--shadow-button-default)',
        'vn-button-hover': 'var(--shadow-button-hover)',
        'vn-navbar': 'var(--shadow-navbar-default)',
        'vn-navbar-scrolled': 'var(--shadow-navbar-scrolled)',
        'vn-modal': 'var(--shadow-modal-backdrop)',
        
        // Legacy support - map to harmonized shadows
        ...vnShadows,
      },
      colors: {
        // Themeable colors using CSS variables (defined in globals.css)
        // These adapt to light/dark mode
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          // Option A: Make light/dark shades also themeable via CSS vars
          // light: "hsl(var(--primary-light))", // Requires --primary-light in globals.css
          // dark: "hsl(var(--primary-dark))",   // Requires --primary-dark in globals.css
          // Option B: Use direct token values for specific shades (these won't change with theme vars)
           light: colors.primary.light, // Fixed light shade
           dark: colors.primary.dark,   // Fixed dark shade
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          // Similar choice for light/dark shades as with primary
          light: colors.secondary.light,
          dark: colors.secondary.dark,
          // Accessible variants
          accessible: "hsl(var(--secondary-accessible))",
          vibrant: "hsl(var(--secondary-vibrant))",
          darker: "hsl(var(--secondary-darker))",
          // Novas variantes suaves
          muted: "hsl(var(--secondary-muted))",
          subtle: "hsl(var(--secondary-subtle))",
          // Variantes contextuais
          onWhite: "hsl(var(--secondary-onWhite))",
          onLight: "hsl(var(--secondary-onLight))",
          onDark: "hsl(var(--secondary-onDark))",
          // Variantes auto
          auto: "hsl(var(--secondary-onWhite))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        
        // Direct token colors, prefixed with 'vn-'
        // These are fixed values from your tokens and do not use CSS variables for theming.
        // Useful for specific, non-themeable color needs or for a gradual transition.
        vn: {
          ...vnTokenColors, // Spreads all your flattened color tokens
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Smooth shadow transitions
        "shadow-lift": {
          from: { boxShadow: "var(--shadow-sm)" },
          to: { boxShadow: "var(--shadow-lg)" },
        },
        "shadow-settle": {
          from: { boxShadow: "var(--shadow-lg)" },
          to: { boxShadow: "var(--shadow-sm)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shadow-lift": "shadow-lift 0.3s ease-out",
        "shadow-settle": "shadow-settle 0.3s ease-out",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
  ],
};

export default config;
