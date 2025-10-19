import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div<{ $isVisible: boolean; $type: 'success' | 'error' | 'info' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${props => {
    switch (props.$type) {
      case 'success': return 'var(--toast-success-bg)';
      case 'error': return 'var(--toast-error-bg)';
      case 'info': return 'var(--toast-info-bg)';
      default: return 'var(--toast-success-bg)';
    }
  }};
  color: ${props => {
    switch (props.$type) {
      case 'success': return 'var(--toast-success-text)';
      case 'error': return 'var(--toast-error-text)';
      case 'info': return 'var(--toast-info-text)';
      default: return 'var(--toast-success-text)';
    }
  }};
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 500;
  font-size: 14px;
  max-width: 400px;
  animation: ${props => props.$isVisible ? slideIn : slideOut} 0.3s ease-in-out;
  animation-fill-mode: forwards;
`;

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <ToastContainer 
      $isVisible={isVisible}
      $type={type}
    >
      {message}
    </ToastContainer>
  );
};

export default Toast;
