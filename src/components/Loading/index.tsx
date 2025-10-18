import React from 'react';
import * as S from './styles';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Carregando..." }) => {
  return (
    <S.LoadingContainer>
      <S.LoadingSpinner />
      <S.LoadingMessage>{message}</S.LoadingMessage>
    </S.LoadingContainer>
  );
};

export default Loading;
