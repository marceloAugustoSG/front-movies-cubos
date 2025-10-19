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

import { apiService } from './authService';

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('deve existir', () => {
    expect(apiService).toBeDefined();
  });

  it('deve ter método login', () => {
    expect(typeof apiService.login).toBe('function');
  });

  it('deve ter método register', () => {
    expect(typeof apiService.register).toBe('function');
  });

  it('deve ter método logout', () => {
    expect(typeof apiService.logout).toBe('function');
  });

  it('deve ter método getProfile', () => {
    expect(typeof apiService.getProfile).toBe('function');
  });
});