export const ENV_CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Front Movies Cubos',
} as const;

export const validateEnv = () => {
  const requiredVars = ['VITE_API_BASE_URL'];
  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
  }
  
  return {
    isValid: missingVars.length === 0,
    missingVars,
  };
};
