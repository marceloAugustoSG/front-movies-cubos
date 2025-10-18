import React, { useEffect, useState, createContext, useContext } from 'react';
import * as S from './styles';

interface ModalContextType {
  onCloseWithAnimation: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a Modal');
  }
  return context;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <ModalContext.Provider value={{ onCloseWithAnimation: handleClose }}>
      <S.ModalBackdrop isClosing={isClosing}>
        <S.ModalContainer isClosing={isClosing}>
          {title && (
            <S.ModalHeader>
              <S.ModalTitle>{title}</S.ModalTitle>
              <S.CloseButton onClick={handleClose}>×</S.CloseButton>
            </S.ModalHeader>
          )}
          {children}
        </S.ModalContainer>
      </S.ModalBackdrop>
    </ModalContext.Provider>
  );
};

export default Modal;
