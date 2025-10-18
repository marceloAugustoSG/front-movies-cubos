import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'logout' | 'login';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  as?: React.ElementType;
  to?: string;
  href?: string;
}

export const ButtonContainer = styled.button<ButtonProps>`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0px;
  text-align: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.6s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  ${({ variant }) => {
    switch (variant) {
      case 'logout':
        return `
          background-color: var(--button-logout-bg);
          color: var(--color-white);
          width: 90px;
          height: 44px;
          border-radius: 2px;
          
          &:hover {
            background-color: var(--button-logout-hover);
            box-shadow: 0 5px 15px var(--button-shadow);
          }
        `;
      case 'secondary':
        return `
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 2px solid var(--border-color);
          padding: 10px 16px;
          
          &:hover {
            background: var(--border-color);
          }
        `;
      case 'login':
        return `
          background-color: var(--login-button-bg);
          color: var(--color-white);
          width: 83px;
          height: 44px;
          border-radius: 2px;
          padding: 0;

          &:hover {
            background-color: var(--button-logout-hover);
            box-shadow: 0 5px 15px var(--button-shadow);
          }
        `;
      case 'primary':
      default:
        return `
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          color: var(--color-white);
          padding: 12px 20px;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
    }
  }}

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: 8px 12px;
          font-size: 14px;
        `;
      case 'large':
        return `
          padding: 16px 24px;
          font-size: 18px;
        `;
      case 'medium':
      default:
        return `
          padding: 12px 20px;
          font-size: 16px;
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
