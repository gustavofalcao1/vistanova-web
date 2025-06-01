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
      ...tailwindcssPlugin.configs.recommended.rules,
      // Custom Tailwind CSS rules
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": [
        "warn",
        {
          // Add your allowed custom classnames here if any, otherwise keep empty
          // This was previously 'whitelist'
          allowlist: [
            "text-primary", "bg-primary", "border-primary", 
            "text-secondary", "bg-secondary", "border-secondary",
            // Add any other specific classes from your theme that might be flagged
          ],
        },
      ],
      "tailwindcss/no-contradicting-classname": "error",
    },
    // Settings for Tailwind CSS plugin (if needed, often defaults are fine)
    // settings: {
    //   tailwindcss: {
    //     config: 'tailwind.config.js', // Default
    //   }
    // }
  },

  // 3. Global TypeScript and JavaScript/JSX specific configurations
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json", // Crucial for type-aware linting rules
        tsconfigRootDir: __dirname, // Explicitly set the root directory for tsconfig.json
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
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/exhaustive-deps": "warn", // Note: Disabling this can hide potential bugs. Re-evaluate if needed.

      // Custom rule from .eslintrc.js to discourage direct hex color usage
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/]",
          message: "Use theme colors (Tailwind classes or CSS variables) instead of direct hex values.",
        },
      ],
      
      // Add any other global custom rules here
      // Example: "@typescript-eslint/explicit-function-return-type": "warn",
    },
  },

  // 4. Overrides for specific configuration files
  {
    files: [
      "tailwind.config.js", 
      "tailwind.config.cjs", // If you ever use .cjs version
      "postcss.config.mjs", 
      "postcss.config.js",   // If you ever use .js version
      "next.config.mjs",
      "next.config.js",      // If you ever use .js version
      "next-sitemap.config.js",
      "eslint.config.mjs",   // Linting the linter config itself
    ],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "import/no-commonjs": "off", // Allow CommonJS for these config files
      // Potentially relax other rules for config files if needed
      // "@typescript-eslint/no-unsafe-assignment": "off",
      // "@typescript-eslint/no-unsafe-call": "off",
    },
  },
  
  // 5. Files and directories to be ignored by ESLint
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "public/", // Static assets, generally no JS/TS to lint
      "build.js", // Generated build file, if any
      "vercel-build.js", // Generated Vercel build file, if any
      "*.d.ts", // TypeScript declaration files
      "dist/", // Common distribution folder for compiled scripts/libs
      
      // Scripts (usually run in Node, may use different conventions)
      "scripts/optimize-images.ts",
      "scripts/generate-icons.ts",
      "scripts/download-fonts.ts",
      "scripts/check-colors.ts",
      "src/app/generateGlobalCSS.mjs",
      
      // Specific generated files or large library files you don't control
      // Example: "src/generated/**/*"
    ],
  },
];

export default eslintConfig;
