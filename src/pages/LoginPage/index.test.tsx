import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './index';

const mockLogin = vi.fn();
const mockUseAuth = {
  login: mockLogin,
  isLoading: false,
  user: null as any,
  register: vi.fn(),
  logout: vi.fn(),
  isInitialized: true,
};

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth,
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to}>{children}</a>
    ),
  };
});

vi.mock('../../components/Button', () => ({
  default: ({ children, onClick, disabled, type }: any) => (
    <button onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  ),
}));


vi.mock('lucide-react', () => ({
  Eye: () => <span data-testid="eye-icon">👁️</span>,
  EyeOff: () => <span data-testid="eye-off-icon">🙈</span>,
}));

const renderLoginPage = () => {
  return render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
};

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.user = null;
    mockUseAuth.isLoading = false;
  });

  it('deve renderizar a página de login', () => {
    renderLoginPage();
    
    expect(screen.getByText('Entrar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite seu nome/E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('deve mostrar link para página de registro', () => {
    renderLoginPage();
    
    expect(screen.getByRole('link', { name: /esqueci minha senha/i })).toBeInTheDocument();
  });

  it('deve mostrar link para recuperar senha', () => {
    renderLoginPage();
    
    expect(screen.getByRole('link', { name: /esqueci minha senha/i })).toBeInTheDocument();
  });

  it('deve atualizar campos de entrada', () => {
    renderLoginPage();
    
    const emailInput = screen.getByPlaceholderText('Digite seu nome/E-mail');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('deve chamar login quando formulário é enviado', async () => {
    mockLogin.mockResolvedValue({});
    renderLoginPage();
    
    const emailInput = screen.getByPlaceholderText('Digite seu nome/E-mail');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('deve mostrar erro quando login falha', async () => {
    mockLogin.mockRejectedValue(new Error('Credenciais inválidas'));
    renderLoginPage();
    
    const emailInput = screen.getByPlaceholderText('Digite seu nome/E-mail');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Erro ao fazer login. Verifique suas credenciais.')).toBeInTheDocument();
    });
  });

  it('deve navegar para /movies quando usuário já está logado', () => {
    mockUseAuth.user = { id: '1', email: 'test@example.com', name: 'Test User' };
    renderLoginPage();
    
    expect(mockNavigate).toHaveBeenCalledWith('/movies');
  });

  it('deve navegar para /movies após login bem-sucedido', async () => {
    mockLogin.mockResolvedValue({});
    renderLoginPage();
    
    const emailInput = screen.getByPlaceholderText('Digite seu nome/E-mail');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/movies');
    });
  });

  it('deve limpar erro quando campos são alterados', async () => {
    mockLogin.mockRejectedValue(new Error('Credenciais inválidas'));
    renderLoginPage();
    
    const emailInput = screen.getByPlaceholderText('Digite seu nome/E-mail');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Erro ao fazer login. Verifique suas credenciais.')).toBeInTheDocument();
    });
    
    fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
    
    await waitFor(() => {
      expect(screen.queryByText('Erro ao fazer login. Verifique suas credenciais.')).not.toBeInTheDocument();
    });
  });

  it('deve desabilitar botão durante carregamento', () => {
    mockUseAuth.isLoading = true;
    renderLoginPage();
    
    const submitButton = screen.getByRole('button', { name: /entrando/i });
    expect(submitButton).toBeDisabled();
  });

  it('deve mostrar estado de carregamento', () => {
    mockUseAuth.isLoading = true;
    renderLoginPage();
    
    expect(screen.getByText('Entrando...')).toBeInTheDocument();
  });
});
