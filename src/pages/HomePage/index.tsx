import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import * as S from './styles';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate('/movies');
    }
  }, [user, navigate]);

  return (
    <S.HomeContainer>
      <S.HomeContent>
        <S.Title>🎬 Bem-vindo ao Movies Cubos</S.Title>
        <S.Description>
          Gerencie sua coleção de filmes favoritos de forma fácil e intuitiva.
        </S.Description>
        <S.ButtonGroup>
          <Button variant="primary" onClick={() => navigate('/login')}>
            Entrar
          </Button>
          <Button variant="secondary" onClick={() => navigate('/register')}>
            Cadastrar
          </Button>
        </S.ButtonGroup>
      </S.HomeContent>
    </S.HomeContainer>
  );
};

export default HomePage;
