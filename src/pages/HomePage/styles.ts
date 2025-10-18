import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  color: white;
  text-align: center;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  font-size: 24px;
  margin-bottom: 40px;
  opacity: 0.9;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

