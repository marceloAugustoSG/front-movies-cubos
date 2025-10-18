import styled from 'styled-components';

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
              case 'add-movie':
                return `
                  background-color: var(--button-logout-bg);
                  color: var(--color-white);
                  width: 151px;
                  height: 44px;
                  border-radius: 2px;
                  padding: 0;
        
                  &:hover {
                    background-color: var(--button-logout-hover);
                    box-shadow: 0 5px 15px var(--button-shadow);
                  }
                  
                  @media (max-width: 414px) {
                    flex: 2;
                    width: auto;
                  }
                  
                  @media (min-width: 415px) {
                    flex: 1;
                    width: auto;
                    min-width: 151px;
                  }
                `;
              case 'filter':
                return `
                  background-color: transparent;
                  color: var(--text-primary);
                  border: 1px solid var(--border-color);
                  width: auto;
                  height: 44px;
                  border-radius: 2px;
                  padding: 0 16px;
        
                  &:hover {
                    background-color: var(--bg-tertiary);
                    border-color: var(--accent-primary);
                  }
                `;
              case 'filter-toggle':
                return `
                  background-color: var(--theme-toggle-bg);
                  color: var(--theme-toggle-text);
                  width: auto;
                  height: 44px;
                  border-radius: 2px;
                  padding: 0 16px;
                  border: none;
        
                  &:hover {
                    background-color: var(--button-logout-hover);
                    color: var(--color-white);
                    box-shadow: 0 5px 15px var(--button-shadow);
                  }
                  
                  @media (max-width: 414px) {
                    flex: 1;
                    width: auto;
                  }
                  
                  @media (min-width: 415px) {
                    flex: 1;
                    width: auto;
                    min-width: 80px;
                  }
                `;
              case 'pagination':
                return `
                  background-color: #8E4EC6;
                  color: #FFFFFF;
                  width: 50px;
                  height: 45px;
                  border-radius: 4px;
                  padding: 0;
                  border: none;
                  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                  font-weight: 400;
                  font-style: normal;
                  font-size: 16px;
                  line-height: 100%;
                  letter-spacing: 0px;
                  text-align: center;
                  
                  &:hover {
                    background-color: var(--button-logout-hover);
                    box-shadow: var(--button-shadow);
                  }
                `;
              case 'pagination-active':
                return `
                  background-color: #EBEAF814;
                  color: #EAE6FD6E;
                  width: 50px;
                  height: 45px;
                  border-radius: 4px;
                  padding: 0;
                  border: none;
                  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                  font-weight: 400;
                  font-style: normal;
                  font-size: 16px;
                  line-height: 100%;
                  letter-spacing: 0px;
                  text-align: center;
                  
                  &:hover {
                    background-color: var(--button-logout-hover);
                    box-shadow: var(--button-shadow);
                  }
                `;
              case 'pagination-disabled':
                return `
                  background-color: #3C393F;
                  color: #6F6D78;
                  width: 64px;
                  height: 44px;
                  border-radius: 4px;
                  padding: 0;
                  border: none;
                  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                  font-weight: 400;
                  font-style: normal;
                  font-size: 16px;
                  line-height: 100%;
                  letter-spacing: 0px;
                  text-align: center;
                  cursor: not-allowed;
                  
                  &:hover {
                    background-color: #3C393F;
                    box-shadow: none;
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
  
  ${({ variant }) => variant === 'logout' && `
    @media (max-width: 414px) {
      width: 70px;
      height: 36px;
      font-size: 14px;
    }
    
    @media (min-width: 415px) and (max-width: 768px) {
      width: 80px;
      height: 40px;
      font-size: 15px;
    }
    
    @media (min-width: 769px) and (max-width: 1365px) {
      width: 85px;
      height: 42px;
      font-size: 15px;
      margin-right: 16px;
    }
    
    @media (min-width: 1366px) {
      width: 90px;
      height: 44px;
      font-size: 16px;
      margin-right: 16px;
    }
  `}
`;
