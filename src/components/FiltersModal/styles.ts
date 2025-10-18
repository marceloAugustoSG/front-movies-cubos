import styled from 'styled-components';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FilterLabel = styled.label`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: var(--text-primary);
`;

export const DurationInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const DurationSeparator = styled.span`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: var(--text-secondary);
`;

export const DateInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const DateSeparator = styled.span`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: var(--text-secondary);
`;

export const GenreSelect = styled.select`
  width: 100%;
  height: 44px;
  padding: 12px;
  border: 1px solid var(--login-input-border);
  border-radius: 4px;
  background: var(--login-input-bg);
  color: var(--login-input-text);
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
  }

  option {
    background: var(--login-input-bg);
    color: var(--login-input-text);
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--border-primary);
  margin-top: auto;
`;
