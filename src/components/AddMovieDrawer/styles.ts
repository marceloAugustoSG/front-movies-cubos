import styled from 'styled-components';

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const FormLabel = styled.label`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: var(--form-label-text);
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 88px;
  border-radius: 4px;
  padding: 12px;
  border: 1px solid var(--input-border);
  background-color: var(--input-bg);
  color: var(--input-text);
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  resize: vertical;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &::placeholder {
    color: var(--input-placeholder);
  }

  &:focus {
    outline: none;
    border-color: var(--input-focus-border);
    box-shadow: 0 0 0 2px var(--input-focus-shadow);
  }

  &:hover:not(:focus) {
    border-color: var(--input-hover-border);
  }

  &::-webkit-autofill,
  &::-webkit-autofill:hover,
  &::-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px var(--input-bg) inset;
    -webkit-text-fill-color: var(--input-text);
    caret-color: var(--input-text);
  }
`;

export const DrawerActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid var(--border-primary);
  flex-shrink: 0;
`;

export const ErrorMessage = styled.div`
  color: var(--error-text-color);
  font-size: 12px;
  margin-top: 4px;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

export const ImagePreview = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
`;

export const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 300px;
  border-radius: 4px;
  border: 1px solid var(--input-border);
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ImageInputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

export const UploadButton = styled.div<{ $disabled?: boolean }>`
  position: relative;
  flex-shrink: 0;
  opacity: ${props => props.$disabled ? 0.6 : 1};
`;

export const FileInput = styled.input<{ disabled?: boolean }>`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

export const UploadLabel = styled.div`
  background-color: var(--button-secondary-bg);
  color: var(--theme-toggle-text);
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid var(--input-border);
  cursor: pointer;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;

  &:hover {
    background-color: var(--button-secondary-hover);
  }

  &:active {
    background-color: var(--button-secondary-active);
  }
`;
