import React, { useEffect, useState, createContext, useContext } from 'react';
import * as S from './styles';

interface DrawerContextType {
  onCloseWithAnimation: () => void;
}

const DrawerContext = createContext<DrawerContextType | null>(null);

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawerContext must be used within a Drawer');
  }
  return context;
};

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children, title }) => {
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
    <DrawerContext.Provider value={{ onCloseWithAnimation: handleClose }}>
      <S.DrawerBackdrop isClosing={isClosing}>
        <S.DrawerContainer isClosing={isClosing}>
          {title && (
            <S.DrawerHeader>
              <S.DrawerTitle>{title}</S.DrawerTitle>
              <S.CloseButton onClick={handleClose}>×</S.CloseButton>
            </S.DrawerHeader>
          )}
          {children}
        </S.DrawerContainer>
      </S.DrawerBackdrop>
    </DrawerContext.Provider>
  );
};

export default Drawer;
