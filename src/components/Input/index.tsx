import React from 'react';
import * as S from './styles';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'search' | 'number' | 'url' | 'date';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: 'default' | 'search';
  icon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  inputMode?: 'search' | 'none' | 'text' | 'email' | 'numeric' | 'tel' | 'url' | 'decimal';
  pattern?: string;
  min?: string;
  max?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  variant = 'default',
  icon,
  required = false,
  disabled = false,
  name,
  id,
  ...props
}) => {
  return (
    <S.InputContainer variant={variant}>
      <S.InputField
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        name={name}
        id={id}
        variant={variant}
        {...props}
      />
      {icon && <S.IconContainer>{icon}</S.IconContainer>}
    </S.InputContainer>
  );
};

export default Input;
