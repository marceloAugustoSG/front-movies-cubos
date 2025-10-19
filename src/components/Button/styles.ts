import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'logout' | 'login' | 'add-movie' | 'filter' | 'filter-toggle' | 'pagination' | 'pagination-active' | 'pagination-disabled' | 'pagination-arrow' | 'drawer-cancel' | 'drawer-add' | 'modal-cancel' | 'modal-apply';
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
          background-color: var(--button-primary-bg);
          color: var(--color-white);
          width: 90px;
          height: 44px;
          border-radius: 2px;
          
          &:hover {
            background-color: var(--button-primary-hover);
            box-shadow: 0 5px 15px var(--button-shadow);
          }
          
          &:active {
            background-color: var(--button-primary-active);
          }
          
          &:disabled {
            background-color: var(--button-primary-disabled);
            cursor: not-allowed;
          }
        `;
      case 'secondary':
        return `
          background-color: var(--button-secondary-bg);
          color: var(--text-primary);
          border: none;
          border-radius: 2px;
          padding: 10px 16px;
          
          &:hover {
            background-color: var(--button-secondary-hover);
          }
          
          &:active {
            background-color: var(--button-secondary-active);
          }
          
          &:disabled {
            background-color: var(--button-secondary-disabled);
            cursor: not-allowed;
          }
        `;
              case 'login':
                return `
                  background-color: var(--button-primary-bg);
                  color: var(--color-white);
                  width: 83px;
                  height: 44px;
                  border-radius: 2px;
                  padding: 0;
        
                  &:hover {
                    background-color: var(--button-primary-hover);
                    box-shadow: 0 5px 15px var(--button-shadow);
                  }
                  
                  &:active {
                    background-color: var(--button-primary-active);
                  }
                  
                  &:disabled {
                    background-color: var(--button-primary-disabled);
                    cursor: not-allowed;
                  }
                `;
              case 'add-movie':
                return `
                  background-color: var(--button-primary-bg);
                  color: var(--color-white);
                  width: 151px;
                  height: 44px;
                  border-radius: 2px;
                  padding: 0;
                  white-space: nowrap;
        
                  &:hover {
                    background-color: var(--button-primary-hover);
                    box-shadow: 0 5px 15px var(--button-shadow);
                  }
                  
                  &:active {
                    background-color: var(--button-primary-active);
                  }
                  
                  &:disabled {
                    background-color: var(--button-primary-disabled);
                    cursor: not-allowed;
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
                  background-color: var(--button-secondary-bg);
                  color: var(--theme-toggle-text);
                  width: 103px;
                  height: 44px;
                  border-radius: 2px;
                  padding: 0 16px;
                  border: none;
        
                  &:hover {
                    background-color: var(--button-secondary-hover);
                  }
                  
                  &:active {
                    background-color: var(--button-secondary-active);
                  }
                  
                  &:disabled {
                    background-color: var(--button-secondary-disabled);
                    cursor: not-allowed;
                  }
                  
                  @media (max-width: 414px) {
                    flex: 1;
                    width: auto;
                  }
                  
                  @media (min-width: 415px) {
                    flex: 1;
                    width: auto;
                    min-width: 103px;
                  }
                `;
              case 'pagination':
                return `
                  background-color: var(--button-primary-bg);
                  color: var(--color-white);
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
                    background-color: var(--button-primary-hover);
                  }
                  
                  &:active {
                    background-color: var(--button-primary-active);
                  }
                  
                  &:disabled {
                    background-color: var(--button-primary-disabled);
                    cursor: not-allowed;
                  }
                  
                  @media (max-width: 480px) {
                    width: 40px;
                    height: 36px;
                    font-size: 14px;
                  }
                  
                  @media (min-width: 481px) and (max-width: 768px) {
                    width: 45px;
                    height: 40px;
                    font-size: 15px;
                  }
                  
                  @media (min-width: 769px) and (max-width: 1365px) {
                    width: 48px;
                    height: 42px;
                    font-size: 15px;
                  }
                  
                  @media (min-width: 1366px) {
                    width: 50px;
                    height: 45px;
                    font-size: 16px;
                  }
                `;
              case 'pagination-active':
                return `
                  background-color: var(--button-secondary-disabled);
                  color: var(--input-text);
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
                    background-color: var(--button-secondary-disabled);
                  }
                  
                  &:active {
                    background-color: var(--button-secondary-disabled);
                  }
                  
                  &:disabled {
                    background-color: var(--button-secondary-disabled);
                    cursor: not-allowed;
                  }
                  
                  @media (max-width: 480px) {
                    width: 40px;
                    height: 36px;
                    font-size: 14px;
                  }
                  
                  @media (min-width: 481px) and (max-width: 768px) {
                    width: 45px;
                    height: 40px;
                    font-size: 15px;
                  }
                  
                  @media (min-width: 769px) and (max-width: 1365px) {
                    width: 48px;
                    height: 42px;
                    font-size: 15px;
                  }
                  
                  @media (min-width: 1366px) {
                    width: 50px;
                    height: 45px;
                    font-size: 16px;
                  }
                `;
              case 'pagination-disabled':
                return `
                  background-color: var(--button-secondary-disabled);
                  color: var(--button-primary-disabled);
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
                    background-color: var(--button-secondary-disabled);
                  }
                  
                  &:active {
                    background-color: var(--button-secondary-disabled);
                  }
                  
                  &:disabled {
                    background-color: var(--button-secondary-disabled);
                    cursor: not-allowed;
                  }
                  
                  @media (max-width: 480px) {
                    width: 50px;
                    height: 36px;
                    font-size: 14px;
                  }
                  
                  @media (min-width: 481px) and (max-width: 768px) {
                    width: 56px;
                    height: 40px;
                    font-size: 15px;
                  }
                  
                  @media (min-width: 769px) and (max-width: 1365px) {
                    width: 60px;
                    height: 42px;
                    font-size: 15px;
                  }
                  
                  @media (min-width: 1366px) {
                    width: 64px;
                    height: 45px;
                    font-size: 16px;
                  }
                `;
              case 'pagination-arrow':
                return `
                  background-color: var(--button-primary-bg);
                  color: var(--color-white);
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
                  
                  &:hover {
                    background-color: var(--button-primary-hover);
                  }
                  
                  &:active {
                    background-color: var(--button-primary-active);
                  }
                  
                  &:disabled {
                    background-color: var(--button-primary-disabled);
                    cursor: not-allowed;
                  }
                  
                  @media (max-width: 480px) {
                    width: 50px;
                    height: 36px;
                    font-size: 14px;
                  }
                  
                  @media (min-width: 481px) and (max-width: 768px) {
                    width: 56px;
                    height: 40px;
                    font-size: 15px;
                  }
                  
                  @media (min-width: 769px) and (max-width: 1365px) {
                    width: 60px;
                    height: 42px;
                    font-size: 15px;
                  }
                  
                  @media (min-width: 1366px) {
                    width: 64px;
                    height: 45px;
                    font-size: 16px;
                  }
                `;
              case 'drawer-cancel':
                return `
                  background-color: var(--button-secondary-bg);
                  color: var(--theme-toggle-text);
                  width: 103px;
                  height: 44px;
                  border-radius: 2px;
                  padding: 0 16px;
                  border: none;
        
                  &:hover {
                    background-color: var(--button-secondary-hover);
                  }
                  
                  &:active {
                    background-color: var(--button-secondary-active);
                  }
                  
                  &:disabled {
                    background-color: var(--button-secondary-disabled);
                    cursor: not-allowed;
                  }
                `;
              case 'drawer-add':
                return `
                  background-color: var(--button-primary-bg);
                  color: var(--color-white);
                  width: 151px;
                  height: 44px;
                  border-radius: 2px;
                  padding: 0;
                  white-space: nowrap;
        
                  &:hover {
                    background-color: var(--button-primary-hover);
                    box-shadow: 0 5px 15px var(--button-shadow);
                  }
                  
                  &:active {
                    background-color: var(--button-primary-active);
                  }
                  
                  &:disabled {
                    background-color: var(--button-primary-disabled);
                    cursor: not-allowed;
                  }
                `;
              case 'modal-cancel':
                return `
                  background-color: var(--button-secondary-bg);
                  color: var(--theme-toggle-text);
                  width: 103px;
                  height: 44px;
                  border-radius: 2px;
                  padding: 0 16px;
                  border: none;
        
                  &:hover {
                    background-color: var(--button-secondary-hover);
                  }
                  
                  &:active {
                    background-color: var(--button-secondary-active);
                  }
                  
                  &:disabled {
                    background-color: var(--button-secondary-disabled);
                    cursor: not-allowed;
                  }
                `;
              case 'modal-apply':
                return `
                  background-color: var(--button-primary-bg);
                  color: var(--color-white);
                  width: 151px;
                  height: 44px;
                  border-radius: 2px;
                  padding: 0;
                  white-space: nowrap;
        
                  &:hover {
                    background-color: var(--button-primary-hover);
                    box-shadow: 0 5px 15px var(--button-shadow);
                  }
                  
                  &:active {
                    background-color: var(--button-primary-active);
                  }
                  
                  &:disabled {
                    background-color: var(--button-primary-disabled);
                    cursor: not-allowed;
                  }
                `;
      case 'primary':
      default:
        return `
          background-color: var(--button-primary-bg);
          color: var(--color-white);
          border-radius: 2px;
          padding: 12px 20px;
          
          &:hover {
            background-color: var(--button-primary-hover);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
          }
          
          &:active {
            background-color: var(--button-primary-active);
          }
          
          &:disabled {
            background-color: var(--button-primary-disabled);
            cursor: not-allowed;
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
