import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import Button from '../Button';
import * as S from './styles';

const Header: React.FC = () => {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <S.HeaderContainer>
      <S.Logo>
        <img src="/logo_cubos.svg" alt="Cubos Logo" />
        <S.LogoText>Movies</S.LogoText>
      </S.Logo>
      
      <S.HeaderActions>
        <S.ThemeToggleButton 
          onClick={toggleTheme}
          title={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
        >
          {theme === 'dark' ? <Sun size={20} fill="currentColor" /> : <Moon size={20} fill="currentColor" />}
        </S.ThemeToggleButton>
        
        <Button 
          variant="logout" 
          onClick={handleLogout}
          disabled={!user}
        >
          Logout
        </Button>
      </S.HeaderActions>
    </S.HeaderContainer>
  );
};

export default Header;
