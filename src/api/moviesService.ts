import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONFIG } from './config';
import type { Movie, MoviesResponse } from '../types';

class MoviesService {
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

  async getMovies(page: number = 1, limit: number = 10): Promise<Movie[]> {
    try {
      const response: AxiosResponse<Movie[]> = await this.api.get(
        `${API_CONFIG.ENDPOINTS.MOVIES}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Erro ao buscar filmes');
      } else if (error.request) {
        throw new Error('Erro de conexão com a API');
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }

  async getMovieById(id: number): Promise<Movie> {
    try {
      const response: AxiosResponse<Movie> = await this.api.get(
        `${API_CONFIG.ENDPOINTS.MOVIES}/${id}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Erro ao buscar filme');
      } else if (error.request) {
        throw new Error('Erro de conexão com a API');
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }

  async createMovie(movieData: Partial<Movie>): Promise<Movie> {
    try {
      const response: AxiosResponse<Movie> = await this.api.post(
        API_CONFIG.ENDPOINTS.MOVIES,
        movieData
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Erro ao criar filme');
      } else if (error.request) {
        throw new Error('Erro de conexão com a API');
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }

  async updateMovie(id: number, movieData: Partial<Movie>): Promise<Movie> {
    try {
      const response: AxiosResponse<Movie> = await this.api.put(
        `${API_CONFIG.ENDPOINTS.MOVIES}/${id}`,
        movieData
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Erro ao atualizar filme');
      } else if (error.request) {
        throw new Error('Erro de conexão com a API');
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }

  async deleteMovie(id: number): Promise<void> {
    try {
      await this.api.delete(`${API_CONFIG.ENDPOINTS.MOVIES}/${id}`);
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Erro ao excluir filme');
      } else if (error.request) {
        throw new Error('Erro de conexão com a API');
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }
}

export const moviesService = new MoviesService();
export type { Movie, MoviesResponse };
