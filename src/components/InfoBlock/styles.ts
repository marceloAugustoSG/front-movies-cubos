import styled from 'styled-components';

export const InfoBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: var(--synopsis-bg);
  padding: 16px;
  border-radius: 4px;
`;

export const InfoBlockTitle = styled.h3`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0px;
  text-transform: uppercase;
  color: var(--info-block-label);
  margin: 0;
`;

export const InfoBlockValue = styled.div`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0px;
  color: var(--info-block-value);
  margin: 0;
`;
