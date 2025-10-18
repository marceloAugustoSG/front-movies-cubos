import styled from 'styled-components';

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: 
    var(--background-gradient),
    url('/background_cinema_cubos.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding: 20px;
  position: relative;
`;

export const RegisterCard = styled.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  box-shadow: 0 10px 30px var(--shadow);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--border-color);
  margin: 0 0 100px 0;
`;

export const Title = styled.h1`
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 14px;
`;

export const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 16px;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: border-color 0.3s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

export const LoginLink = styled.div`
  text-align: center;
  margin-top: 20px;
  color: var(--text-secondary);
  font-size: 14px;

  a {
    color: var(--accent-primary);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;
