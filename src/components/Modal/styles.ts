import styled from 'styled-components';

export const ModalBackdrop = styled.div<{ isClosing?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #B5B2BC40;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
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

export const ModalContainer = styled.div<{ isClosing?: boolean }>`
  background-color: #232225;
  border-radius: 8px;
  width: 570px;
  height: 455px;
  padding: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  transform: ${({ isClosing }) => 
    isClosing ? 'scale(0.9) translateY(-20px)' : 'scale(1) translateY(0)'
  };
  opacity: ${({ isClosing }) => (isClosing ? 0 : 1)};
  animation: ${({ isClosing }) => (isClosing ? 'slideOut' : 'slideIn')} 0.3s ease-out forwards;
  
  @keyframes slideIn {
    from {
      transform: scale(0.9) translateY(-20px);
      opacity: 0;
    }
    to {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
    to {
      transform: scale(0.9) translateY(-20px);
      opacity: 0;
    }
  }
`;

export const ModalTitle = styled.h2`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0px;
  text-align: left;
  color: #B5B2BC;
  margin: 0 0 16px 0;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid var(--border-primary);
`;
