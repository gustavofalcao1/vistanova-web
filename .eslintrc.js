module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['tailwindcss'],
  rules: {
    // Regras para garantir o uso consistente de cores
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'warn',
    'tailwindcss/no-contradicting-classname': 'error',
    
    // Regra personalizada para desencorajar o uso de cores hexadecimais diretamente
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value=/#[0-9a-fA-F]{3,6}/]',
        message: 'Use as cores do tema em vez de valores hexadecimais diretamente.',
      },
    ],
  },
  settings: {
    tailwindcss: {
      // Especifica a versão do Tailwind CSS
      whitelist: ['text-primary', 'bg-primary', 'border-primary', 'text-secondary', 'bg-secondary', 'border-secondary'],
    },
    next: {
      rootDir: ['src/*/'],
    },
  },
  overrides: [
    {
      files: ['tailwind.config.js', 'tailwind.config.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-commonjs': 'off',
      },
    },
    {
      files: ['*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-commonjs': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
