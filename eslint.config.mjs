import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  // 1. Base configurations from Next.js (includes React, Core Web Vitals, TypeScript basics)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 2. Tailwind CSS plugin configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Apply Tailwind rules to these files
    plugins: {
      tailwindcss: tailwindcssPlugin,
    },
    rules: {
      // Spread recommended rules for Tailwind CSS
      ...tailwindcssPlugin.configs.recommended.rules, // Use recommended rules as a base
      // Custom Tailwind CSS rules (from your original .eslintrc.js)
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": [
        "warn",
        {
          allowlist: [ // Renamed from whitelist
            "text-primary", "bg-primary", "border-primary", 
            "text-secondary", "bg-secondary", "border-secondary",
            // Add any other specific classes from your theme that might be flagged
          ],
        },
      ],
      "tailwindcss/no-contradicting-classname": "error",
    },
  },

  // 3. Global TypeScript and JavaScript/JSX specific configurations
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json", 
        tsconfigRootDir: __dirname, 
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",
      },
    },
    rules: {
      // Rules migrated from .eslintrc.json
      "@typescript-eslint/no-unused-vars": "off", // As per your .eslintrc.json
      "@typescript-eslint/no-explicit-any": "off", // As per your .eslintrc.json
      "react-hooks/exhaustive-deps": "warn", // Changed from "off" to "warn" as per previous suggestion

      // The "no-restricted-syntax" rule for hex colors has been REMOVED.
      // Color checking will be handled by the `scripts/check-colors.ts` script.
      
      // Add any other global custom rules here if needed
    },
  },

  // 4. Overrides for specific configuration files
  {
    files: [
      "tailwind.config.js", 
      "tailwind.config.mjs", // Added .mjs variant
      "tailwind.config.cjs",
      "postcss.config.mjs", 
      "postcss.config.js",   
      "next.config.mjs",
      "next.config.js",      
      "next-sitemap.config.js",
      "next-sitemap.config.mjs", // Added .mjs variant
      "eslint.config.mjs",   
    ],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "import/no-commonjs": "off", 
    },
  },
  
  // 5. Files and directories to be ignored by ESLint
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "public/", 
      "build.js", 
      "vercel-build.js", 
      "*.d.ts", 
      "dist/", 
      "scripts/optimize-images.ts",
      "scripts/generate-icons.ts",
      "scripts/download-fonts.ts",
      "scripts/check-colors.ts", // Don't lint the color checker script with these rules
      "src/app/generateGlobalCSS.mjs",
    ],
  },
];

export default eslintConfig;
