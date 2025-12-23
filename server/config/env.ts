/**
 * Environment configuration
 * Load and validate environment variables
 */

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value && !defaultValue) {
    console.warn(`⚠️  Environment variable ${key} not found`);
  }
  return value || '';
};

export const env = {
  // Database
  DATABASE_URL: getEnvVar('DATABASE_URL'),
  PGHOST: getEnvVar('PGHOST'),
  PGPORT: getEnvVar('PGPORT', '5432'),
  PGDATABASE: getEnvVar('PGDATABASE'),
  PGUSER: getEnvVar('PGUSER'),
  PGPASSWORD: getEnvVar('PGPASSWORD'),

  // Session
  SESSION_SECRET: getEnvVar('SESSION_SECRET', 'default-secret-key'),

  // Analytics
  GA_MEASUREMENT_ID: getEnvVar('VITE_GA_MEASUREMENT_ID', ''),

  // Email Configuration
  GMAIL_USER: getEnvVar('GMAIL_USER', ''),
  GMAIL_APP_PASSWORD: getEnvVar('GMAIL_APP_PASSWORD', ''),

  // Telegram Bot
  TELEGRAM_BOT_TOKEN: getEnvVar('TELEGRAM_BOT_TOKEN', ''),
  TELEGRAM_CHAT_ID: getEnvVar('TELEGRAM_CHAT_ID', ''),

  // Admin Registration
  ADMIN_REGISTRATION_SECRET: getEnvVar('ADMIN_REGISTRATION_SECRET', ''),

  // API Keys
  OPENAI_API_KEY: getEnvVar('OPENAI_API_KEY', ''),
  STRIPE_SECRET_KEY: getEnvVar('STRIPE_SECRET_KEY', ''),

  // Application
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
  PORT: parseInt(getEnvVar('PORT', '5000'), 10),

  // Replit
  REPLIT_DEV_DOMAIN: getEnvVar('REPLIT_DEV_DOMAIN', ''),
  REPLIT_DOMAINS: getEnvVar('REPLIT_DOMAINS', ''),

  // Validation helpers
  isDevelopment: () => process.env.NODE_ENV === 'development',
  isProduction: () => process.env.NODE_ENV === 'production',
};

/**
 * Validate critical environment variables
 */
export const validateEnv = () => {
  const criticalVars = ['DATABASE_URL', 'SESSION_SECRET'];
  const missing: string[] = [];

  criticalVars.forEach(varName => {
    if (!process.env[varName] && varName !== 'SESSION_SECRET') {
      missing.push(varName);
    }
  });

  if (missing.length > 0) {
    console.warn(`⚠️  Missing critical environment variables: ${missing.join(', ')}`);
  }
};
