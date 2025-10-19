import React from 'react';
import styled, { keyframes } from 'styled-components';
import Button from '../Button';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  movieTitle: string;
  isDeleting?: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
`;

const ModalOverlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #B5B2BC40;
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${props => props.$isVisible ? fadeIn : fadeOut} 0.3s ease-in-out;
  animation-fill-mode: forwards;
`;

const ModalContent = styled.div<{ $isVisible: boolean }>`
  background-color: #232225;
  border-radius: 4px;
  padding: 32px;
  max-width: 570px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${props => props.$isVisible ? slideIn : slideOut} 0.3s ease-in-out;
  animation-fill-mode: forwards;
`;

const ModalTitle = styled.h2`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-style: Regular;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0px;
  text-align: left;
  color: #B5B2BC;
  margin: 0 0 24px 0;
`;

const ModalMessage = styled.p`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: #EEEEF0;
  margin: 0 0 32px 0;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  movieTitle,
  isDeleting = false
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay $isVisible={isOpen} onClick={onClose}>
      <ModalContent $isVisible={isOpen} onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Confirmar Exclusão</ModalTitle>
        <ModalMessage>
          Tem certeza que deseja remover o filme: <strong>{movieTitle}</strong>?
        </ModalMessage>
        <ModalActions>
          <Button 
            variant="secondary" 
            onClick={onClose}
            disabled={isDeleting}
          >
            Não
          </Button>
          <Button 
            variant="primary" 
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Excluindo...' : 'Sim'}
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DeleteConfirmationModal;
