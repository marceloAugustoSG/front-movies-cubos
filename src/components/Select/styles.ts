import styled from 'styled-components';

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledSelect = styled.select`
  width: 100%;
  height: 44px;
  min-height: 44px;
  padding: 12px;
  border: 1px solid var(--input-border);
  border-radius: 4px;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0px;
  background-color: var(--input-bg);
  color: var(--input-text);
  transition: border-color 0.3s ease;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238E4EC6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;

  &:focus {
    outline: none;
    border-color: var(--input-focus-border);
    background-color: var(--input-focus-bg);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: var(--input-disabled-bg);
  }

  option {
    background-color: var(--input-bg);
    color: var(--input-text);
    padding: 8px;
  }
`;

export const Option = styled.option`
  background-color: var(--input-bg);
  color: var(--input-text);
  padding: 8px;
`;
