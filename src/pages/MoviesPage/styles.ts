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
    grid-auto-rows: auto;
  }
  
  @media (min-width: 384px) and (max-width: 414px) {
    gap: 16px;
    margin-bottom: 20px;
    grid-template-columns: repeat(2, 183px);
    grid-auto-rows: auto;
  }
  
  @media (min-width: 415px) and (max-width: 768px) {
    gap: 24px;
    margin-bottom: 20px;
    grid-template-columns: repeat(auto-fill, 183px);
    grid-auto-rows: auto;
  }
  
  @media (min-width: 769px) {
    gap: 24px;
    margin-bottom: 20px;
    grid-template-columns: repeat(auto-fill, 183px);
    grid-auto-rows: auto;
  }
  
  @media (min-width: 1366px) {
    grid-template-columns: repeat(auto-fill, 235px);
    grid-auto-rows: auto;
  }
`;

export const MovieCard = styled.div`
  background: var(--bg-secondary);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 12px var(--shadow);
  transition: box-shadow 0.2s ease;
  cursor: pointer;
  width: 183px;
  height: auto;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &.movie-card {
    /* Classe para hover do circle-progress */
  }
  
  @media (max-width: 356px) {
    width: 100%;
    height: auto;
  }
  
  @media (min-width: 357px) and (max-width: 383px) {
    width: 150px;
    height: auto;
  }
  
  @media (min-width: 384px) and (max-width: 414px) {
    width: 183px;
    height: auto;
  }
  
  @media (min-width: 415px) and (max-width: 1365px) {
    width: 183px;
    height: auto;
  }
  
  @media (min-width: 1366px) {
    width: 235px;
    height: auto;
  }
  
  &:hover {
    /* Apenas o circle-progress aparece no hover */
  }
`;

export const MovieOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9));
  padding: 40px 16px 16px;
  border-radius: 0 0 4px 4px;
  box-shadow: var(--movie-card-shadow);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 60px;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 4px;
  
  ${MovieCard}:hover & {
    opacity: 1;
  }
`;


export const HoverGenres = styled.p`
  color: var(--movie-genre-color);
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12.8px;
  font-weight: 400;
  margin: 0 0 0 16px;
  text-align: start;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  word-wrap: break-word;
  white-space: normal;
  line-height: 1.4;
  max-width: calc(100% - 32px);
  
  ${MovieCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const MovieTitle = styled.h3`
  color: var(--movie-title-color);
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 0 16px;
  text-align: start;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  line-height: 1.3;
  transition: transform 0.3s ease;
  
  ${MovieCard}:hover & {
    transform: translateY(-8px);
  }
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
  background-color: var(--error-text-color);
  color: white;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`;

export const MovieImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 4px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  
  @media (max-width: 356px) {
    height: 220px;
  }
  
  @media (min-width: 357px) and (max-width: 383px) {
    height: 200px;
  }
  
  @media (min-width: 384px) and (max-width: 414px) {
    height: 240px;
  }
  
  @media (min-width: 415px) and (max-width: 1365px) {
    height: 280px;
  }
  
  @media (min-width: 1366px) {
    height: 350px;
  }
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

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  min-height: 400px;
`;

export const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.6;
`;

export const EmptyTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px 0;
`;

export const EmptyMessage = styled.p`
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0 0 32px 0;
  max-width: 400px;
  line-height: 1.5;
`;

export const EmptyAction = styled.div`
  display: flex;
  justify-content: center;
`;