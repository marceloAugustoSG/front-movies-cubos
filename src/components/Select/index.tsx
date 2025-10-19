import React from 'react';
import * as S from './styles';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  name,
  id
}) => {
  return (
    <S.SelectContainer>
      <S.StyledSelect
        value={value}
        onChange={onChange}
        disabled={disabled}
        name={name}
        id={id}
      >
        {placeholder && (
          <S.Option value="" disabled>
            {placeholder}
          </S.Option>
        )}
        {options.map((option) => (
          <S.Option key={option.value} value={option.value}>
            {option.label}
          </S.Option>
        ))}
      </S.StyledSelect>
    </S.SelectContainer>
  );
};

export default Select;
