import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 18px;
  text-align: center;
  padding: 20px;
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid var(--border-color);
  border-top: 5px solid var(--accent-primary);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`;

export const LoadingMessage = styled.p`
  font-size: 1.2em;
  color: var(--text-secondary);
`;
