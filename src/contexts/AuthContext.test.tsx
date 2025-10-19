import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../api/authService', () => ({
  apiService: {
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    getProfile: vi.fn(),
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

import { AuthProvider, useAuth } from './AuthContext';
import { apiService } from '../api/authService';

const mockApiService = vi.mocked(apiService);

const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('deve inicializar com usuário null quando não há dados salvos', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isInitialized).toBe(true);
  });

  it('deve inicializar com usuário quando há dados salvos no localStorage', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.user).toEqual(mockUser);
  });

  it('deve fazer login com sucesso', async () => {
    const mockResponse = {
      user: mockUser,
      token: 'mock-token',
    };
    
    mockApiService.login.mockResolvedValue(mockResponse);
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password123',
      });
    });
    
    expect(result.current.user).toEqual(mockUser);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
    expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'mock-token');
  });

  it('deve lançar erro quando login falha', async () => {
    const errorMessage = 'Credenciais inválidas';
    mockApiService.login.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await expect(
        result.current.login({
          email: 'test@example.com',
          password: 'wrongpassword',
        })
      ).rejects.toThrow(errorMessage);
    });
    
    expect(result.current.user).toBeNull();
  });

  it('deve registrar usuário com sucesso', async () => {
    const mockResponse = {
      user: mockUser,
      token: 'mock-token',
    };
    
    mockApiService.register.mockResolvedValue(mockResponse);
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    });
    
    expect(result.current.user).toEqual(mockUser);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
    expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'mock-token');
  });

  it('deve fazer logout', async () => {
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    mockApiService.login.mockResolvedValue({
      user: mockUser,
      token: 'mock-token',
    });
    
    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password123',
      });
    });
    
    expect(result.current.user).toEqual(mockUser);
    
    act(() => {
      result.current.logout();
    });
    
    expect(result.current.user).toBeNull();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
  });

  it('deve definir loading como true durante operações', async () => {
    let resolveLogin: (value: { user: typeof mockUser; token: string }) => void;
    const loginPromise = new Promise<{ user: typeof mockUser; token: string }>((resolve) => {
      resolveLogin = resolve;
    });
    
    mockApiService.login.mockReturnValue(loginPromise);
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    act(() => {
      result.current.login({
        email: 'test@example.com',
        password: 'password123',
      });
    });
    
    expect(result.current.isLoading).toBe(true);
    
    await act(async () => {
      resolveLogin!({ user: mockUser, token: 'mock-token' });
    });
    
    expect(result.current.isLoading).toBe(false);
  });

  it('deve definir loading como false quando operação falha', async () => {
    mockApiService.login.mockRejectedValue(new Error('Login failed'));
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      try {
        await result.current.login({
          email: 'test@example.com',
          password: 'wrongpassword',
        });
      } catch (error) {
      }
    });
    
    expect(result.current.isLoading).toBe(false);
  });

  it('deve lançar erro quando useAuth é usado fora do provider', () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth deve ser usado dentro de um AuthProvider');
  });

  it('deve inicializar isInitialized como true após montagem', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.isInitialized).toBe(true);
  });
});
