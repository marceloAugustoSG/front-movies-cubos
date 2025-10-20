import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONFIG } from './config';

// Função auxiliar para operações seguras com localStorage
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('Erro ao acessar localStorage:', error);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Erro ao salvar no localStorage:', error);
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Erro ao remover do localStorage:', error);
    }
  }
};

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
        const token = safeLocalStorage.getItem('token');
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
          safeLocalStorage.removeItem('token');
          safeLocalStorage.removeItem('user');
          window.location.href = '/';
        }
        return Promise.reject(error);
      }
    );
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('Tentando login com:', { email: credentials.email, baseURL: this.api.defaults.baseURL });
      }
      
      const response: AxiosResponse<LoginResponse> = await this.api.post(
        API_CONFIG.ENDPOINTS.LOGIN,
        credentials
      );
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Login bem-sucedido:', response.data);
      }
      
      return response.data;
    } catch (error: unknown) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro no login:', error);
      }
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { 
          response?: { 
            data?: { message?: string },
            status?: number,
            statusText?: string
          } 
        };
        
        const status = axiosError.response?.status;
        const message = axiosError.response?.data?.message || axiosError.response?.statusText || 'Erro ao fazer login';
        
        if (status === 401) {
          throw new Error('Credenciais inválidas. Verifique seu email e senha.');
        } else if (status === 403) {
          throw new Error('Acesso negado. Entre em contato com o suporte.');
        } else if (status === 429) {
          throw new Error('Muitas tentativas de login. Tente novamente em alguns minutos.');
        } else if (status && status >= 500) {
          throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
        } else {
          throw new Error(message);
        }
      } else if (error && typeof error === 'object' && 'request' in error) {
        throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
      } else if (error && typeof error === 'object' && 'code' in error) {
        const networkError = error as { code?: string, message?: string };
        if (networkError.code === 'NETWORK_ERROR' || networkError.code === 'ECONNABORTED') {
          throw new Error('Timeout de conexão. Verifique sua internet e tente novamente.');
        }
        throw new Error(networkError.message || 'Erro de rede');
      } else {
        throw new Error('Erro inesperado. Tente novamente.');
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
      safeLocalStorage.removeItem('token');
      safeLocalStorage.removeItem('user');
    }
  }
}

export const apiService = new ApiService();
export type { LoginRequest, RegisterRequest, LoginResponse, RegisterResponse, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse, ApiError };
