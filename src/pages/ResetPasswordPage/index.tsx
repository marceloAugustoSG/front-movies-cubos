import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Lock, CheckCircle } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { apiService } from '../../api/authService';
import * as S from './styles';

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setError('Token de recuperação inválido ou expirado');
      return;
    }
    setToken(tokenParam);
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    
    if (password.length < 6) {
      errors.push('A senha deve ter pelo menos 6 caracteres');
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra minúscula');
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra maiúscula');
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push('A senha deve conter pelo menos um número');
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.newPassword.trim()) {
      setError('Por favor, digite a nova senha');
      return;
    }

    if (!formData.confirmPassword.trim()) {
      setError('Por favor, confirme a nova senha');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    const passwordErrors = validatePassword(formData.newPassword);
    if (passwordErrors.length > 0) {
      setError(passwordErrors.join('. '));
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      await apiService.resetPassword(token, formData.newPassword);
      setIsSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao redefinir senha. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <S.Container>
        <S.Card>
          <S.SuccessIcon>
            <CheckCircle size={48} />
          </S.SuccessIcon>
          
          <S.Title>Senha Redefinida!</S.Title>
          
          <S.Message>
            Sua senha foi redefinida com sucesso.
          </S.Message>
          
          <S.Instructions>
            Agora você pode fazer login com sua nova senha.
          </S.Instructions>
          
          <S.ButtonContainer>
            <Link to="/login">
              <Button variant="primary">
                <ArrowLeft size={16} />
                Fazer Login
              </Button>
            </Link>
          </S.ButtonContainer>
        </S.Card>
      </S.Container>
    );
  }

  if (!token && error) {
    return (
      <S.Container>
        <S.Card>
          <S.ErrorIcon>
            <Lock size={48} />
          </S.ErrorIcon>
          
          <S.Title>Token Inválido</S.Title>
          
          <S.Message>
            O link de recuperação é inválido ou expirou.
          </S.Message>
          
          <S.Instructions>
            Solicite um novo link de recuperação de senha.
          </S.Instructions>
          
          <S.ButtonContainer>
            <Link to="/forgot-password">
              <Button variant="primary">
                Solicitar Novo Link
              </Button>
            </Link>
          </S.ButtonContainer>
        </S.Card>
      </S.Container>
    );
  }

  return (
    <S.LoginContainer>
      <S.LoginCard>
        <S.Form onSubmit={handleSubmit}>
          <S.InputGroup>
            <S.Label htmlFor="newPassword">Nova Senha</S.Label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Digite sua nova senha"
              required
              disabled={isLoading}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label htmlFor="confirmPassword">Confirmar Senha</S.Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirme sua nova senha"
              required
              disabled={isLoading}
            />
          </S.InputGroup>

          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

          <S.BottomRow>
            <S.ForgotPasswordLink>
              <Link to="/login">Voltar ao login</Link>
            </S.ForgotPasswordLink>
            
            <Button variant="login" type="submit" disabled={isLoading || !formData.newPassword.trim() || !formData.confirmPassword.trim()}>
              {isLoading ? 'Redefinindo...' : 'Redefinir Senha'}
            </Button>
          </S.BottomRow>
        </S.Form>
      </S.LoginCard>
    </S.LoginContainer>
  );
};

export default ResetPasswordPage;
