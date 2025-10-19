import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { apiService } from '../../api/authService';
import * as S from './styles';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Por favor, digite seu email');
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor, digite um email válido');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      await apiService.forgotPassword(email.trim());
      setIsSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar email de recuperação. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  if (isSuccess) {
    return (
      <S.Container>
        <S.Card>
          <S.SuccessIcon>
            <Mail size={48} />
          </S.SuccessIcon>
          
          <S.Title>Email Enviado!</S.Title>
          
          <S.Message>
            Enviamos um link de recuperação para <strong>{email}</strong>
          </S.Message>
          
          <S.Instructions>
            Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
            Se não encontrar o email, verifique também a pasta de spam.
          </S.Instructions>
          
          <S.ButtonContainer>
            <Link to="/login">
              <Button variant="primary">
                <ArrowLeft size={16} />
                Voltar ao Login
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
            <S.Label htmlFor="email">E-mail</S.Label>
            <Input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={handleEmailChange}
              required
              disabled={isLoading}
            />
          </S.InputGroup>

          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

          <S.FullWidthButton>
            <Button variant="login" type="submit" disabled={isLoading || !email.trim()}>
              {isLoading ? 'Enviando...' : 'Enviar Link'}
            </Button>
          </S.FullWidthButton>

          <S.ForgotPasswordLink>
            <Link to="/login">Voltar ao login</Link>
          </S.ForgotPasswordLink>
        </S.Form>
      </S.LoginCard>
    </S.LoginContainer>
  );
};

export default ForgotPasswordPage;
