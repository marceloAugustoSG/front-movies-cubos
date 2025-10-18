import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  text-align: center;
  padding: 20px;
`;

export const ErrorCode = styled.h1`
  font-size: 120px;
  font-weight: 700;
  color: var(--accent-primary);
  margin-bottom: 20px;
`;

export const ErrorTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 16px;
  color: var(--text-primary);
`;

export const ErrorMessage = styled.p`
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 30px;
  max-width: 500px;
`;
