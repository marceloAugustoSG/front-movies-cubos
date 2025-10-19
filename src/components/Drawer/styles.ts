import styled from 'styled-components';

export const DrawerBackdrop = styled.div<{ isClosing?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(181, 178, 188, 0.25);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  opacity: ${({ isClosing }) => (isClosing ? 0 : 1)};
  animation: ${({ isClosing }) => (isClosing ? 'fadeOut' : 'fadeIn')} 0.3s ease-out forwards;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const DrawerContainer = styled.div<{ isClosing?: boolean }>`
  background-color: #121113;
  width: 565px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
  transform: ${({ isClosing }) => 
    isClosing ? 'translateX(100%)' : 'translateX(0)'
  };
  animation: ${({ isClosing }) => (isClosing ? 'slideOut' : 'slideIn')} 0.3s ease-out forwards;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }
`;

export const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--border-primary);
`;

export const DrawerTitle = styled.h2`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0px;
  text-align: left;
  color: var(--form-label-text);
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #B5B2BC;
  font-size: 28px;
  font-weight: 300;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(181, 178, 188, 0.1);
    color: #ffffff;
  }

  &:active {
    background-color: rgba(181, 178, 188, 0.2);
  }
`;

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  overflow-y: auto;
`;

export const DrawerActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid var(--border-primary);
  flex-shrink: 0;
`;
