import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import * as S from './styles';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <S.DashboardContainer>
      <S.DashboardContent>
        <S.Title>📊 Dashboard</S.Title>
        <S.Description>
          Bem-vindo ao seu painel de controle de filmes.
        </S.Description>
        <S.ButtonGroup>
          <Button variant="primary" onClick={() => navigate('/movies')}>
            Ver Filmes
          </Button>
          <Button variant="add-movie" onClick={() => navigate('/movies/new')}>
            Adicionar Filme
          </Button>
        </S.ButtonGroup>
      </S.DashboardContent>
    </S.DashboardContainer>
  );
};

export default DashboardPage;
