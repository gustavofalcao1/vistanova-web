/** @type {import('tailwindcss').Config} */
import colors from './src/styles/tokens/colors';

// Flatten color tokens for Tailwind
const flattenColors = (colors, prefix = '') => {
  return Object.keys(colors).reduce((acc, key) => {
    const value = colors[key];
    const newKey = prefix ? `${prefix}-${key}` : key;
    
    if (typeof value === 'object' && value !== null && !('DEFAULT' in value)) {
      return { ...acc, ...flattenColors(value, newKey) };
    }
    
    return { ...acc, [newKey.replace(/-DEFAULT$/, '')]: value };
  }, {});
};

// Get flattened colors for Tailwind
const tailwindColors = flattenColors(colors);

const config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true, // Better performance on mobile
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
      colors: {
        // Using CSS variables for light/dark themes
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
          ...colors.primary,
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          ...colors.secondary,
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
        
        // Direct token colors for use without CSS variables
        vn: {
          ...tailwindColors,
          // Legacy support (to be deprecated)
          primary: colors.primary.DEFAULT,
          'primary-light': colors.primary.light,
          'primary-dark': colors.primary.dark,
          secondary: colors.secondary.DEFAULT,
          'secondary-light': colors.secondary.light,
          'secondary-dark': colors.secondary.dark,
          text: colors.foreground.DEFAULT,
          'text-light': colors.foreground.light,
          'text-dark': colors.foreground.dark,
          'text-on-dark': colors.foreground.onDark,
          'text-muted': colors.foreground.muted,
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
