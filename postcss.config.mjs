// postcss.config.mjs

// Standard PostCSS configuration for Next.js projects using Tailwind CSS.
// This setup includes Tailwind CSS itself and Autoprefixer for browser compatibility.

const postcssConfig = {
  plugins: {
    // Initializes Tailwind CSS with its default settings.
    tailwindcss: {},
    // Adds vendor prefixes to CSS rules using data from Can I Use.
    // This ensures that CSS features work across different browsers.
    autoprefixer: {},
  },
};

export default postcssConfig;
