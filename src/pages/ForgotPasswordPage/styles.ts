import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 140px);
  background: 
    var(--background-gradient),
    url('/background_cinema_cubos.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding: 20px;
  position: relative;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  
  @media (max-width: 356px) {
    padding: 10px;
    min-height: calc(100vh - 120px);
  }
`;

export const LoginCard = styled.div`
  background-color: var(--login-card-bg);
  width: 412px;
  height: 242px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 10px 30px var(--shadow);
  padding: 16px;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  
  @media (max-width: 356px) {
    width: 100%;
    max-width: calc(100vw - 20px);
    height: auto;
    min-height: 280px;
    padding: 12px;
  }
  
  @media (min-width: 357px) and (max-width: 480px) {
    width: calc(100vw - 40px);
    max-width: 400px;
    height: auto;
    min-height: 280px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
`;

export const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

export const ForgotPasswordLink = styled.div`
  a {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--text-primary);
    }
  }
`;

export const FullWidthButton = styled.div`
  width: 100%;
  
  button {
    width: 100%;
  }
`;

export const ErrorMessage = styled.div`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #ff4444;
  margin-top: 8px;
`;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  padding: 20px;
`;

export const Card = styled.div`
  background: var(--card-background);
  border-radius: 8px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const SuccessIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  color: var(--success-color);
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px 0;
  text-align: center;
`;

export const Message = styled.p`
  font-size: 16px;
  color: var(--text-primary);
  margin: 0 0 16px 0;
  text-align: center;
  line-height: 1.5;
`;

export const Instructions = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 32px 0;
  text-align: center;
  line-height: 1.5;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;