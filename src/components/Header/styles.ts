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
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    height: 40px;
    width: auto;
    filter: brightness(0) invert(1);
  }
`;

export const LogoText = styled.p`
  color: var(--logo-text-color);
  font-size: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
`;
