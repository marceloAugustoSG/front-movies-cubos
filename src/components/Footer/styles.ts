import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--header-border);
  background-color: var(--background-footer);
`;

export const FooterText = styled.p`
font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
font-weight: 400;
font-style: Regular;
font-size: 16px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0px;
text-align: center;
color:var(--text-footer);
`;
