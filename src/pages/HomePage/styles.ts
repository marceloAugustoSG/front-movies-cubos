import styled from 'styled-components';

export const HomeContainer = styled.div`
  min-height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const HomeContent = styled.div`
  text-align: center;
  max-width: 600px;
`;

export const Title = styled.h1`
  color: var(--text-primary);
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  margin-bottom: 40px;
  line-height: 1.6;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;
