import React from 'react';
import * as S from './styles';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Carregando..." }) => {
  return (
    <S.LoadingContainer>
      <S.Spinner />
      <S.LoadingText>{message}</S.LoadingText>
    </S.LoadingContainer>
  );
};

export default Loading;
