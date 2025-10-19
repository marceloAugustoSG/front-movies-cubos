import styled from 'styled-components';

interface InputProps {
  variant?: 'default' | 'search';
}

export const InputContainer = styled.div<InputProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: ${({ variant }) => variant === 'search' ? '300px' : 'none'};
  
  @media (max-width: 768px) {
    max-width: none;
  }
`;

export const InputField = styled.input<InputProps>`
  width: 100%;
  height: 44px;
  min-height: 44px;
  padding: ${({ variant }) => variant === 'search' ? '12px 16px' : '12px'};
  padding-right: ${({ variant }) => variant === 'search' ? '44px' : '12px'};
  border: 1px solid var(--input-border);
  border-radius: 4px;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0px;
  background-color: var(--input-bg);
  color: var(--input-text);
  transition: border-color 0.3s ease;

  ${({ variant }) => variant === 'search' && `
    @media (max-width: 414px) {
      font-weight: 700;
    }
  `}

  &:focus {
    outline: none;
    border-color: var(--input-focus-border);
    background-color: var(--input-focus-bg);
    caret-color: var(--input-cursor);
  }

  &::placeholder {
    color: var(--input-placeholder);
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px var(--input-bg) inset !important;
    -webkit-text-fill-color: var(--input-text) !important;
    background-color: var(--input-bg) !important;
  }

  /* Remove number input spinners */
  &[type="number"] {
    -moz-appearance: textfield;
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--input-placeholder);
  pointer-events: none;
`;
