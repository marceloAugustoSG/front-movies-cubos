import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONFIG } from './config';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
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

interface RegisterResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token?: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface ForgotPasswordResponse {
  message: string;
}

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

interface ResetPasswordResponse {
  message: string;
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
          window.location.href = '/';
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
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || 'Erro ao fazer login');
      } else if (error && typeof error === 'object' && 'request' in error) {
        throw new Error('Erro de conexão com a API');
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }

  async register(credentials: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response: AxiosResponse<RegisterResponse> = await this.api.post(
        API_CONFIG.ENDPOINTS.REGISTER,
        credentials
      );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || 'Erro ao criar conta');
      } else if (error && typeof error === 'object' && 'request' in error) {
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
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || 'Erro ao buscar perfil');
      } else if (error && typeof error === 'object' && 'request' in error) {
        throw new Error('Erro de conexão com a API');
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    try {
      const requestData: ForgotPasswordRequest = { email };
      const response: AxiosResponse<ForgotPasswordResponse> = await this.api.post(
        API_CONFIG.ENDPOINTS.FORGOT_PASSWORD,
        requestData
      );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || 'Erro ao enviar email de recuperação');
      } else if (error && typeof error === 'object' && 'request' in error) {
        throw new Error('Erro de conexão com a API');
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<ResetPasswordResponse> {
    try {
      const requestData: ResetPasswordRequest = { token, newPassword };
      const response: AxiosResponse<ResetPasswordResponse> = await this.api.post(
        API_CONFIG.ENDPOINTS.RESET_PASSWORD,
        requestData
      );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || 'Erro ao redefinir senha');
      } else if (error && typeof error === 'object' && 'request' in error) {
        throw new Error('Erro de conexão com a API');
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }

  async logout(): Promise<void> {
    try {
      await this.api.post(API_CONFIG.ENDPOINTS.LOGOUT);
    } catch (error: unknown) {
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}

export const apiService = new ApiService();
export type { LoginRequest, RegisterRequest, LoginResponse, RegisterResponse, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse, ApiError };
