export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'VN Prod',
  VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '2.2.10',
  THEME: process.env.NEXT_PUBLIC_THEME || 'light',
  DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'pt',
  
  // Analytics and Tracking
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
  
  // Usercentrics Configuration
  USERCENTRICS_SETTINGS_ID: process.env.NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID || '', // Using COOKIEBOT variable name for compatibility
  USERCENTRICS_ENABLED: process.env.NEXT_PUBLIC_COOKIEBOT_ENABLED === 'true',
} as const;

export type EnvConfig = typeof ENV;
