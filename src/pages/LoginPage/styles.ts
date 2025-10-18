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
    min-height: 260px;
    padding: 14px;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    width: 400px;
    height: auto;
    min-height: 250px;
    padding: 16px;
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 600;
  
  @media (max-width: 356px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
  
  @media (min-width: 357px) and (max-width: 480px) {
    font-size: 19px;
    margin-bottom: 14px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  
  @media (max-width: 356px) {
    gap: 10px;
  }
  
  @media (min-width: 357px) and (max-width: 480px) {
    gap: 11px;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  @media (max-width: 356px) {
    gap: 3px;
  }
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
  margin-bottom: 8px;
  
  @media (max-width: 356px) {
    font-size: 12px;
    margin-bottom: 6px;
  }
  
  @media (min-width: 357px) and (max-width: 480px) {
    font-size: 12.4px;
    margin-bottom: 7px;
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
  
  @media (max-width: 356px) {
    flex-direction: column;
    gap: 10px;
    margin-top: 6px;
  }
  
  @media (min-width: 357px) and (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
    margin-top: 7px;
  }
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
    
    @media (max-width: 356px) {
      font-size: 14px;
    }
    
    @media (min-width: 357px) and (max-width: 480px) {
      font-size: 15px;
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

