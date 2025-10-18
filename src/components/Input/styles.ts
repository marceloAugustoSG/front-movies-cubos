import styled from 'styled-components';

interface InputProps {
  variant?: 'default' | 'search';
}

export const InputContainer = styled.div<InputProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ variant }) => variant === 'search' ? '300px' : '380px'};
  
  @media (max-width: 768px) {
    width: 100%;
  }
  
  @media (min-width: 769px) {
    width: ${({ variant }) => variant === 'search' ? '300px' : '380px'};
  }
`;

export const InputField = styled.input<InputProps>`
  width: 100%;
  height: 44px;
  min-height: 44px;
  padding: ${({ variant }) => variant === 'search' ? '12px 16px' : '12px'};
  padding-right: ${({ variant }) => variant === 'search' ? '44px' : '12px'};
  border: 1px solid var(--login-input-border);
  border-radius: 4px;
  font-size: 14px;
  background: var(--login-input-bg);
  color: var(--login-input-text);
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    background: var(--login-input-bg);
  }

  &::placeholder {
    color: var(--login-input-text);
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px var(--login-input-bg) inset !important;
    -webkit-text-fill-color: var(--login-input-text) !important;
    background-color: var(--login-input-bg) !important;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--login-input-text);
  pointer-events: none;
`;
