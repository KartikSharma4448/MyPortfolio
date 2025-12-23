/**
 * Client-side environment variables
 * Only VITE_ prefixed variables are exposed to the frontend
 */

export const env = {
  GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
  MODE: import.meta.env.MODE,
  PROD: import.meta.env.PROD,
  DEV: import.meta.env.DEV,
};

/**
 * Check if environment variable is configured
 */
export const isConfigured = (key: keyof typeof env): boolean => {
  return Boolean(env[key]);
};
