import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const Label = styled.label`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 12.8px;
  line-height: 100%;
  letter-spacing: 0px;
  text-align: left;
  color: var(--input-text);
  margin-bottom: 4px;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Input = styled.input`
  flex: 1;
  background-color: var(--login-input-bg);
  border: 1px solid var(--login-input-border);
  border-radius: 4px;
  padding: 12px 16px;
  color: var(--login-input-text);
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  
  &::placeholder {
    color: var(--login-input-text);
    opacity: 0.7;
  }
  
  &:focus {
    outline: none;
    border-color: var(--login-button-bg);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AddButton = styled.button`
  background-color: var(--login-button-bg);
  border: none;
  border-radius: 4px;
  padding: 12px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: var(--button-hover-purple);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const GenresContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

export const GenreTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: var(--login-button-bg);
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
`;

export const GenreText = styled.span`
  color: white;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const EmptyMessage = styled.div`
  color: var(--text-muted);
  font-size: 14px;
  font-style: italic;
  text-align: center;
  padding: 16px;
  background-color: var(--bg-tertiary);
  border-radius: 4px;
  border: 1px dashed var(--border-color);
`;
