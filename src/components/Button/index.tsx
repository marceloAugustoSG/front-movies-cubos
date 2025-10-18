import React from 'react';
import * as S from './styles';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'logout' | 'login' | 'add-movie' | 'filter' | 'filter-toggle' | 'pagination' | 'pagination-active' | 'pagination-disabled';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  as?: React.ElementType;
  to?: string;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'medium',
  children, 
  onClick, 
  disabled = false,
  type = 'button',
  as,
  to,
  href,
  ...props
}) => {
  return (
    <S.ButtonContainer
      as={as}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      type={type}
      to={to}
      href={href}
      {...props}
    >
      {children}
    </S.ButtonContainer>
  );
};

export default Button;
