import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import type { RegisterCredentials } from '../../types';
import * as S from './styles';

const RegisterPage: React.FC = () => {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const { register, isLoading, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/movies');
    }
  }, [user, navigate]);

  React.useEffect(() => {
    if (registerSuccess) {
      navigate('/movies');
    }
  }, [registerSuccess, navigate]);

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

  const toggleConfirmPasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmPassword(prev => !prev);
  };

  const validateForm = () => {
    if (!credentials.name.trim()) {
      setError('Nome é obrigatório.');
      return false;
    }
    if (!credentials.email.trim()) {
      setError('E-mail é obrigatório.');
      return false;
    }
    if (!credentials.email.includes('@')) {
      setError('E-mail deve ser válido.');
      return false;
    }
    if (!credentials.password.trim()) {
      setError('Senha é obrigatória.');
      return false;
    }
    if (credentials.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres.');
      return false;
    }
    if (credentials.password !== credentials.confirmPassword) {
      setError('As senhas não coincidem.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      const registerData = {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      };
      
      await register(registerData);
      setRegisterSuccess(true);
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <S.LoginContainer>
      <S.LoginCard>
        <S.Form onSubmit={handleSubmit}>
          <S.InputGroup>
            <S.Label htmlFor="name">Nome</S.Label>
            <Input
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
            <S.Label htmlFor="email">E-mail</S.Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Digite seu e-mail"
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
          
          <S.InputGroup>
            <S.Label htmlFor="confirmPassword">Confirmar Senha</S.Label>
            <S.PasswordInputContainer>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirme sua senha"
                required
              />
              <S.PasswordToggle type="button" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </S.PasswordToggle>
            </S.PasswordInputContainer>
          </S.InputGroup>
          
          <S.BottomRow>
            <S.ForgotPasswordLink>
              <Link to="/login">Já tem conta? Fazer login</Link>
            </S.ForgotPasswordLink>
            
            <S.FullWidthButton>
              <Button variant="login" type="submit" disabled={isLoading}>
                {isLoading ? 'Criando...' : 'Criar Conta'}
              </Button>
            </S.FullWidthButton>
          </S.BottomRow>
          
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </S.Form>
      </S.LoginCard>
    </S.LoginContainer>
  );
};

export default RegisterPage;