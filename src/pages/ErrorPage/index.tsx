import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import * as S from './styles';

const ErrorPage: React.FC = () => {
  return (
    <S.ErrorContainer>
      <S.ErrorCode>404</S.ErrorCode>
      <S.ErrorTitle>Página não encontrada</S.ErrorTitle>
      <S.ErrorMessage>
        A página que você está procurando não existe ou foi movida.
      </S.ErrorMessage>
      <Button as={Link} to="/">
        🏠 Voltar ao início
      </Button>
    </S.ErrorContainer>
  );
};

export default ErrorPage;