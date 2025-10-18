import styled from 'styled-components';

export const LoginContainer = styled.div`
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

export const LoginCard = styled.div`
  background-color: var(--login-card-bg);
  width: 412px;
  height: 242px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 10px 30px var(--shadow);
  padding: 16px;
  margin: 0 0 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.h1`
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.label`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 12.8px;
  line-height: 100%;
  letter-spacing: 0px;
  text-align: left;
  color: var(--login-label-text);
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 380px;
  height: 44px;
  min-height: 44px;
  padding: 12px;
  border: 1px solid var(--login-input-border);
  border-radius: 4px;
  font-size: 14px;
  background: var(--login-input-bg);
  color: var(--login-input-text);
  transition: border-color 0.3s ease;

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

export const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const ForgotPasswordLink = styled.div`
  a {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0px;
    text-decoration: underline;
    text-decoration-style: solid;
    text-decoration-offset: 0%;
    text-decoration-thickness: 0%;
    color: var(--login-link-text);

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const RegisterLink = styled.div`
  text-align: center;
  margin-top: 8px;
  color: var(--text-secondary);
  font-size: 12px;

  a {
    color: var(--accent-primary);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

