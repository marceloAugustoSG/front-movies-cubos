import styled from 'styled-components';

export const MoviesContainer = styled.div`
  min-height: calc(100vh - 140px);
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  
  @media (max-width: 356px) {
    min-height: calc(100vh - 140px);
    width: 100vw;
    max-width: 100vw;
  }
  
  @media (min-width: 357px) and (max-width: 414px) {
    min-height: calc(100vh - 128px);
  }
`;

export const ControlBar = styled.div`
  height: 92px;
  width: 100%;
  background: transparent;
  padding: 24px 22px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  
  @media (max-width: 356px) {
    height: auto;
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
    padding: 15px 10px;
  }
  
  @media (min-width: 357px) and (max-width: 414px) {
    height: auto;
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
    padding: 15px 10px;
  }
  
  @media (min-width: 415px) and (max-width: 768px) {
    height: auto;
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
    padding: 15px 10px;
  }
`;

export const SearchAndButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  
  @media (min-width: 769px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: auto;
  }
`;

export const ButtonsRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  
  @media (max-width: 356px) {
    flex-direction: column;
    gap: 10px;
  }
  
  @media (min-width: 357px) and (max-width: 768px) {
    flex-direction: row;
    gap: 10px;
  }
  
  @media (min-width: 769px) {
    width: auto;
    flex: 1;
    justify-content: flex-end;
  }
`;

export const MoviesContent = styled.div`
  background-color: var(--movies-content-bg);
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 356px) {
    margin: 0;
    width: 100%;
    max-width: 100vw;
    padding: 10px;
    border-radius: 0;
    box-sizing: border-box;
  }
  
  @media (min-width: 357px) and (max-width: 414px) {
    margin: 0;
    width: 100%;
    max-width: 100%;
    padding: 10px;
    border-radius: 0;
    box-sizing: border-box;
  }
  
  @media (min-width: 415px) and (max-width: 768px) {
    margin: 0;
    width: 100%;
    max-width: 100%;
    padding: 20px;
    border-radius: 8px;
    box-sizing: border-box;
  }
  
  @media (min-width: 769px) {
    margin: 0 24px;
    width: calc(100% - 48px);
    max-width: calc(100vw - 48px);
    padding: 20px;
    border-radius: 8px;
    box-sizing: border-box;
  }
  
  @media (min-width: 1366px) {
    min-height: 782px;
  }
`;

export const MoviesGrid = styled.div`
  display: grid;
  gap: 16px;
  margin-bottom: 30px;
  justify-content: center;
  align-content: start;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 356px) {
    gap: 16px;
    margin-bottom: 20px;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    width: 100%;
    max-width: 100%;
  }
  
  @media (min-width: 357px) and (max-width: 383px) {
    gap: 16px;
    margin-bottom: 20px;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-auto-rows: 225px;
  }
  
  @media (min-width: 384px) and (max-width: 414px) {
    gap: 16px;
    margin-bottom: 20px;
    grid-template-columns: repeat(2, 183px);
    grid-auto-rows: 281px;
  }
  
  @media (min-width: 415px) and (max-width: 768px) {
    gap: 24px;
    margin-bottom: 20px;
    grid-template-columns: repeat(auto-fill, 183px);
    grid-auto-rows: 275px;
  }
  
  @media (min-width: 769px) {
    gap: 24px;
    margin-bottom: 20px;
    grid-template-columns: repeat(auto-fill, 183px);
    grid-auto-rows: 275px;
  }
  
  @media (min-width: 1366px) {
    grid-template-columns: repeat(auto-fill, 235px);
    grid-auto-rows: 355px;
  }
`;

export const MovieCard = styled.div`
  background: var(--bg-secondary);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 12px var(--shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  width: 183px;
  height: 275px;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  
  @media (max-width: 356px) {
    width: 100%;
    height: auto;
    aspect-ratio: 2/3;
  }
  
  @media (min-width: 357px) and (max-width: 383px) {
    width: 150px;
    height: 225px;
  }
  
  @media (min-width: 384px) and (max-width: 414px) {
    width: 183px;
    height: 281px;
  }
  
  @media (min-width: 415px) and (max-width: 1365px) {
    width: 183px;
    height: 275px;
  }
  
  @media (min-width: 1366px) {
    width: 235px;
    height: 355px;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px var(--shadow);
  }
`;

export const MovieOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 20px 16px 16px;
`;

export const MovieTitle = styled.h3`
  color: var(--color-white);
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 92px;
  
  @media (max-width: 480px) {
    height: 60px;
    gap: 8px;
  }
  
  @media (min-width: 481px) and (max-width: 768px) {
    height: 70px;
    gap: 8px;
  }
  
  @media (min-width: 769px) and (max-width: 1365px) {
    height: 80px;
    gap: 8px;
  }
  
  @media (min-width: 1366px) {
    height: 92px;
    gap: 8px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: var(--text-secondary);
`;

export const EmptyTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  color: var(--text-primary);
`;

export const EmptyDescription = styled.p`
  font-size: 16px;
  margin-bottom: 32px;
  max-width: 400px;
  line-height: 1.5;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const LoadingMessage = styled.div`
  color: var(--text-primary);
  font-size: 18px;
  text-align: center;
  padding: 40px;
`;

export const ErrorMessage = styled.div`
  background-color: #ff6b6b;
  color: white;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`;

export const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

export const MovieInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 20px 16px 16px;
  color: var(--color-white);
`;

export const MovieDescription = styled.p`
  font-size: 14px;
  margin: 8px 0;
  line-height: 1.4;
  color: var(--color-white);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

export const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
`;

export const MovieDetail = styled.span`
  font-size: 12px;
  color: var(--color-white);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;