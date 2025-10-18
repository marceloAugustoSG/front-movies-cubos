import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import * as S from './styles';

const HomePage: React.FC = () => {
  return (
    <S.HomeContainer>
      <S.Title>
        🎬 Front Movies Cubos
      </S.Title>
      <S.Subtitle>Bem-vindo ao nosso sistema de filmes!</S.Subtitle>
      <S.ButtonGroup>
        <Button as={Link} to="/login">
          🔑 Fazer Login
        </Button>
        <Button as={Link} to="/register">
          👤 Criar Conta
        </Button>
      </S.ButtonGroup>
    </S.HomeContainer>
  );
};

export default HomePage;
