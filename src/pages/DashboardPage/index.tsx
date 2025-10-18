import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import * as S from './styles';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <S.DashboardContainer>
      <S.DashboardCard>
        <S.Header>
          <S.Title>Dashboard</S.Title>
        </S.Header>
        
        <S.UserInfo>
          👤 Bem-vindo, <strong>{user?.name}</strong>!
        </S.UserInfo>
        
        <S.Content>
          <p>✅ Você está logado com sucesso!</p>
          <p>
            📧 Email: {user?.email}
          </p>
          <p>
            🆔 ID: {user?.id}
          </p>
          <p>Tema atual: <strong>{theme === 'dark' ? '🌙 Escuro' : '☀️ Claro'}</strong></p>
        </S.Content>
      </S.DashboardCard>
    </S.DashboardContainer>
  );
};

export default DashboardPage;
