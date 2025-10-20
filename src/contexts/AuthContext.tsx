import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginCredentials, RegisterRequest, AuthContextType } from '../types';
import { apiService } from '../api/authService';
import { logMobileDebugInfo, isPrivateBrowsing } from '../utils/mobileUtils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = safeLocalStorage.getItem('user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        console.warn('Erro ao fazer parse do usuário salvo:', error);
        safeLocalStorage.removeItem('user');
        return null;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    
    // Log informações de debug para mobile
    logMobileDebugInfo();
    
    // Verifica se está em modo privado (pode causar problemas no mobile)
    if (isPrivateBrowsing()) {
      console.warn('Navegação privada detectada - localStorage pode não funcionar corretamente');
    }
    
    try {
      const response = await apiService.login(credentials);
      
      setUser(response.user);
      safeLocalStorage.setItem('user', JSON.stringify(response.user));
      
      if (response.token) {
        safeLocalStorage.setItem('token', response.token);
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer login';
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterRequest): Promise<void> => {
    setIsLoading(true);
    
    try {
      const response = await apiService.register(credentials);
      
      setUser(response.user);
      safeLocalStorage.setItem('user', JSON.stringify(response.user));
      
      if (response.token) {
        safeLocalStorage.setItem('token', response.token);
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar conta';
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    safeLocalStorage.removeItem('user');
    safeLocalStorage.removeItem('token');
  };

  React.useEffect(() => {
    const savedUser = safeLocalStorage.getItem('user');
    const savedToken = safeLocalStorage.getItem('token');
    
    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.warn('Erro ao fazer parse do usuário salvo:', error);
        safeLocalStorage.removeItem('user');
        safeLocalStorage.removeItem('token');
      }
    }
    setIsInitialized(true);
  }, []);

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading: isLoading || !isInitialized,
    isInitialized
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
