import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONFIG } from './config';
import type { Movie, MoviesResponse, CreateMovieRequest, UpdateMovieRequest } from '../types';

interface PaginatedMoviesResponse {
  movies: Movie[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
import type { MovieFilters } from '../components/FiltersModal';

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
          window.location.href = '/';
        }
        return Promise.reject(error);
      }
    );
  }

  async getMovies(page: number = 1, limit: number = 10, filters?: MovieFilters): Promise<PaginatedMoviesResponse> {
    try {
      const params = new URLSearchParams();
      
      if (filters?.title) params.append('title', filters.title);
      if (filters?.releaseYear) params.append('releaseYear', filters.releaseYear.toString());
      if (filters?.releaseDateFrom) {
        params.append('releaseDateStart', filters.releaseDateFrom);
      }
      if (filters?.releaseDateTo) {
        params.append('releaseDateEnd', filters.releaseDateTo);
      }
      if (filters?.minDuration) params.append('minDuration', filters.minDuration.toString());
      if (filters?.maxDuration) params.append('maxDuration', filters.maxDuration.toString());
      if (filters?.minBudget) params.append('minBudget', filters.minBudget.toString());
      if (filters?.maxBudget) params.append('maxBudget', filters.maxBudget.toString());
      if (filters?.userId) params.append('userId', filters.userId);
      if (filters?.genre) params.append('genres', filters.genre);
      
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      const hasFilters = filters && Object.values(filters).some(value => value !== undefined && value !== '');
      
      if (hasFilters) {
        const response: AxiosResponse<PaginatedMoviesResponse> = await this.api.get(
          `/movies/filter/paginated?${params.toString()}`
        );
        return response.data;
      } else {
        const response: AxiosResponse<PaginatedMoviesResponse> = await this.api.get(
          `/movies/paginated?${params.toString()}`
        );
        return response.data;
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || 'Erro ao buscar filmes');
      } else if (error && typeof error === 'object' && 'request' in error) {
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
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || 'Erro ao buscar filme');
      } else if (error && typeof error === 'object' && 'request' in error) {
        throw new Error('Erro de conexão com a API');
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }

  async createMovie(movieData: CreateMovieRequest): Promise<Movie> {
    try {
      const response: AxiosResponse<Movie> = await this.api.post(
        API_CONFIG.ENDPOINTS.MOVIES,
        movieData
      );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || 'Erro ao criar filme');
      } else if (error && typeof error === 'object' && 'request' in error) {
        throw new Error('Erro de conexão com a API');
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }

  async updateMovie(id: number, movieData: UpdateMovieRequest): Promise<Movie> {
    try {
      const response: AxiosResponse<Movie> = await this.api.patch(
        `${API_CONFIG.ENDPOINTS.MOVIES}/${id}`,
        movieData
      );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || 'Erro ao atualizar filme');
      } else if (error && typeof error === 'object' && 'request' in error) {
        throw new Error('Erro de conexão com a API');
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }

  async deleteMovie(id: number): Promise<void> {
    try {
      await this.api.delete(`${API_CONFIG.ENDPOINTS.MOVIES}/${id}`);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || 'Erro ao excluir filme');
      } else if (error && typeof error === 'object' && 'request' in error) {
        throw new Error('Erro de conexão com a API');
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }
}

export const moviesService = new MoviesService();
export type { Movie, MoviesResponse };
