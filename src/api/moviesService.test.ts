import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() }
      },
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    })),
  },
}));

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

import { moviesService } from './moviesService';

describe('MoviesService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('deve existir', () => {
    expect(moviesService).toBeDefined();
  });

  it('deve ter método getMovies', () => {
    expect(typeof moviesService.getMovies).toBe('function');
  });

  it('deve ter método getMovieById', () => {
    expect(typeof moviesService.getMovieById).toBe('function');
  });

  it('deve ter método createMovie', () => {
    expect(typeof moviesService.createMovie).toBe('function');
  });

  it('deve ter método updateMovie', () => {
    expect(typeof moviesService.updateMovie).toBe('function');
  });

  it('deve ter método deleteMovie', () => {
    expect(typeof moviesService.deleteMovie).toBe('function');
  });
});