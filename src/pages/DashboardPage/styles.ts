import styled from 'styled-components';

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 20px;
`;

export const DashboardCard = styled.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  box-shadow: 0 10px 30px var(--shadow);
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid var(--border-color);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  color: var(--text-primary);
  font-size: 28px;
  font-weight: 600;
`;

export const UserInfo = styled.div`
  color: var(--text-secondary);
  font-size: 16px;
`;

export const Content = styled.div`
  color: var(--text-secondary);
  font-size: 18px;
  line-height: 1.6;
`;
