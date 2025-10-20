import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import type { LoginCredentials } from '../../types';
import * as S from './styles';

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/movies');
    }
  }, [user, navigate]);

  React.useEffect(() => {
    if (loginSuccess) {
      navigate('/movies');
    }
  }, [loginSuccess, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoginSuccess(false);

    try {
      await login(credentials);
      setLoginSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login. Verifique suas credenciais.';
      setError(errorMessage);
      
      // Log do erro para debug em desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro no login:', err);
      }
    }
  };

  return (
    <S.LoginContainer>
      <S.LoginCard>
        <S.Form onSubmit={handleSubmit}>
                  <S.InputGroup>
                    <S.Label htmlFor="email">Nome/E-mail</S.Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={credentials.email}
                      onChange={handleInputChange}
                      placeholder="Digite seu nome/E-mail"
                      required
                    />
                  </S.InputGroup>
                  
                  <S.InputGroup>
                    <S.Label htmlFor="password">Senha</S.Label>
                    <S.PasswordInputContainer>
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        placeholder="Digite sua senha"
                        required
                      />
                      <S.PasswordToggle type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </S.PasswordToggle>
                    </S.PasswordInputContainer>
                  </S.InputGroup>
                  
                  <S.BottomRow>
                    <S.ForgotPasswordLink>
                      <Link to="/forgot-password">Esqueci minha senha</Link>
                    </S.ForgotPasswordLink>
                    
                    <Button variant="login" type="submit" disabled={isLoading}>
                      {isLoading ? 'Entrando...' : 'Entrar'}
                    </Button>
                  </S.BottomRow>
          
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </S.Form>
        
      
      </S.LoginCard>
    </S.LoginContainer>
  );
};

export default LoginPage;
