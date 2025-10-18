import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: var(--header-bg);
  height: 72px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--header-border);
  
  @media (max-width: 414px) {
    height: 60px;
    padding: 0 20px;
  }
  
  @media (min-width: 415px) and (max-width: 768px) {
    height: 68px;
    padding: 0 20px;
  }
  
  @media (min-width: 769px) and (max-width: 1365px) {
    height: 70px;
    padding: 0 20px;
  }
  
  @media (min-width: 1366px) {
    height: 72px;
    padding: 0 20px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    height: 40px;
    width: auto;
    filter: brightness(0) invert(1);
    transition: height 0.3s ease;
    
    @media (max-width: 414px) {
      height: 28px;
    }
    
    @media (min-width: 415px) and (max-width: 768px) {
      height: 32px;
    }
    
    @media (min-width: 769px) and (max-width: 1365px) {
      height: 36px;
    }
    
    @media (min-width: 1366px) {
      height: 40px;
    }
  }
`;

export const LogoText = styled.p`
  color: var(--logo-text-color);
  font-size: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 700;
  margin: 0;
  padding: 0;
  transition: all 0.3s ease;
  
  @media (max-width: 414px) {
    font-size: 16px;
  }
  
  @media (min-width: 415px) and (max-width: 768px) {
    font-size: 18px;
  }
  
  @media (min-width: 769px) and (max-width: 1365px) {
    font-size: 19px;
  }
  
  @media (min-width: 1366px) {
    font-size: 20px;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 414px) {
    gap: 6px;
  }
  
  @media (min-width: 415px) and (max-width: 768px) {
    gap: 8px;
  }
  
  @media (min-width: 769px) and (max-width: 1365px) {
    gap: 12px;
  }
  
  @media (min-width: 1366px) {
    gap: 16px;
  }
`;

export const ThemeToggleButton = styled.button`
  width: 64px;
  height: 44px;
  background-color: var(--theme-toggle-bg);
  border-radius: 2px;
  border: none;
  cursor: pointer;
  transition: all 0.6s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--theme-toggle-text);

  svg {
    transition: all 0.6s ease;
  }

  &:hover {
    background-color: var(--button-logout-hover);
    color: white;
    box-shadow: 0 5px 15px var(--button-shadow);
  }

  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 414px) {
    width: 48px;
    height: 36px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
  
  @media (min-width: 415px) and (max-width: 768px) {
    width: 56px;
    height: 40px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
  
  @media (min-width: 769px) and (max-width: 1365px) {
    width: 60px;
    height: 42px;
    
    svg {
      width: 19px;
      height: 19px;
    }
  }
  
  @media (min-width: 1366px) {
    width: 64px;
    height: 44px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
