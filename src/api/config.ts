import { ENV_CONFIG } from '../config/env';

export const API_CONFIG = {
  BASE_URL: ENV_CONFIG.API_BASE_URL,
  ENDPOINTS: {
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
    LOGOUT: '/auth/logout',
    MOVIES: '/movies',
  },
  TIMEOUT: ENV_CONFIG.API_TIMEOUT,
} as const;
