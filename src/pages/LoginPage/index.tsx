import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import type { LoginCredentials } from '../../types';
import * as S from './styles';

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/movies');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(credentials);
      navigate('/movies');
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <S.LoginContainer>
      <S.LoginCard>
        <S.Form onSubmit={handleSubmit}>
          <S.InputGroup>
            <S.Label htmlFor="email">Nome/E-mail</S.Label>
            <S.Input
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
                    <S.Input
                      type="password"
                      id="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      placeholder="Digite sua senha"
                      required
                    />
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
        
        <S.RegisterLink>
          Não tem uma conta? <Link to="/register">Criar conta</Link>
        </S.RegisterLink>
      </S.LoginCard>
    </S.LoginContainer>
  );
};

export default LoginPage;
