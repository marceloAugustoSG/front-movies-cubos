import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import * as S from './styles';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <S.ThemeToggleButton 
      onClick={toggleTheme}
      title={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </S.ThemeToggleButton>
  );
};

export default ThemeToggle;
