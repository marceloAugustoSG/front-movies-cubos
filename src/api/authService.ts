import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONFIG } from './config';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token?: string;
}

interface ApiError {
  message: string;
  status: number;
}

class ApiService {
  private api: AxiosInstance;

  constructor(baseURL: string = API_CONFIG.BASE_URL) {
    this.api = axios.create({
      baseURL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await this.api.post(
        API_CONFIG.ENDPOINTS.LOGIN,
        credentials
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Erro ao fazer login');
        } else if (error.request) {
          throw new Error('Erro de conexão com a API');
        } else {
          throw new Error('Erro inesperado');
        }
    }
  }

  async getProfile(): Promise<LoginResponse['user']> {
    try {
      const response: AxiosResponse<LoginResponse['user']> = await this.api.get(
        API_CONFIG.ENDPOINTS.PROFILE
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Erro ao buscar perfil');
      } else if (error.request) {
        throw new Error('Erro de conexão com a API');
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }

  async logout(): Promise<void> {
    try {
      await this.api.post(API_CONFIG.ENDPOINTS.LOGOUT);
    } catch (error: any) {
      console.warn('Erro no logout:', error.message);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}

export const apiService = new ApiService();
export type { LoginRequest, LoginResponse, ApiError };
