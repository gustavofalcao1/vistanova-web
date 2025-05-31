import nextPlugin from '@next/eslint-plugin-next';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@next/next': nextPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    // Migrated from .eslintignore
    ignores: [
      'node_modules',
      '.next',
      'out',
      'public',
      'build.js',
      'vercel-build.js',
      'next.config.js',
      'tailwind.config.js',
      'postcss.config.js',
      '*.d.ts',
    ],
  },
];
