import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import * as S from './styles';

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
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

  const validateForm = (): boolean => {
    if (!credentials.name.trim()) {
      setError('Nome é obrigatório');
      return false;
    }
    if (!credentials.email.trim()) {
      setError('Email é obrigatório');
      return false;
    }
    if (!credentials.password) {
      setError('Senha é obrigatória');
      return false;
    }
    if (credentials.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return false;
    }
    if (credentials.password !== credentials.confirmPassword) {
      setError('Senhas não coincidem');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      navigate('/login');
      
    } catch (err) {
      setError('Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.RegisterContainer>
      <S.RegisterCard>
        <S.Title>Criar Conta</S.Title>
        <S.Form onSubmit={handleSubmit}>
          <S.InputGroup>
            <S.Label htmlFor="name">👤 Nome</S.Label>
            <S.Input
              type="text"
              id="name"
              name="name"
              value={credentials.name}
              onChange={handleInputChange}
              placeholder="Digite seu nome completo"
              required
            />
          </S.InputGroup>
          
          <S.InputGroup>
            <S.Label htmlFor="email">📧 Email</S.Label>
            <S.Input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Digite seu email"
              required
            />
          </S.InputGroup>
          
          <S.InputGroup>
            <S.Label htmlFor="password">🔒 Senha</S.Label>
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
          
          <S.InputGroup>
            <S.Label htmlFor="confirmPassword">🔒 Confirmar Senha</S.Label>
            <S.Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirme sua senha"
              required
            />
          </S.InputGroup>
          
          <Button type="submit" disabled={isLoading}>
            ✨ {isLoading ? 'Criando conta...' : 'Criar Conta'}
          </Button>
          
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </S.Form>
        
        <S.LoginLink>
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </S.LoginLink>
      </S.RegisterCard>
    </S.RegisterContainer>
  );
};

export default RegisterPage;