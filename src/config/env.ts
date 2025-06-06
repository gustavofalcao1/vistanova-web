export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'VN Prod',
  VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  THEME: process.env.NEXT_PUBLIC_THEME || 'light',
  DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'pt',
} as const;

export type EnvConfig = typeof ENV;
