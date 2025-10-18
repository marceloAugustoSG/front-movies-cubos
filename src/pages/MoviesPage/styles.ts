import styled from 'styled-components';

export const MoviesContainer = styled.div`
  min-height: calc(100vh - 140px);
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 414px) {
    min-height: calc(100vh - 128px);
  }
  
  /* Tablet */
  @media (min-width: 415px) and (max-width: 768px) {
    min-height: calc(100vh - 140px);
  }
  
  /* Desktop Small */
  @media (min-width: 769px) and (max-width: 1365px) {
    min-height: calc(100vh - 140px);
  }
  
  @media (min-width: 1366px) {
    min-height: calc(100vh - 140px);
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
  
  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
    padding: 15px 10px;
  }
  
  @media (min-width: 769px) {
    height: 92px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding: 24px 22px;
  }
`;

export const SearchAndButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
  }
  
  @media (min-width: 769px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    width: auto;
  }
`;

export const ButtonsRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  
  @media (max-width: 768px) {
    width: 100%;
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
  flex: 1;
  
  @media (max-width: 604px) {
    margin: 0 10px;
    width: calc(100% - 20px);
    padding: 10px;
  }
  
  @media (min-width: 605px) {
    margin: 0 22px;
    width: calc(100% - 44px);
    padding: 20px;
  }
  
  @media (min-width: 1366px) {
    height: 782px;
    margin: 0 22px;
    width: calc(100% - 44px);
    padding: 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Title = styled.h1`
  color: var(--text-primary);
  font-size: 32px;
  font-weight: 700;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const MoviesGrid = styled.div`
  display: grid;
  gap: 24px;
  margin-bottom: 30px;
  justify-content: center;
  align-content: start;
  
  @media (max-width: 383px) {
    gap: 24px;
    margin-bottom: 20px;
    grid-template-columns: repeat(auto-fit, 150px);
    grid-auto-rows: 225px;
  }
  
  @media (min-width: 384px) and (max-width: 1365px) {
    gap: 24px;
    margin-bottom: 20px;
    grid-template-columns: repeat(auto-fit, 183px);
    grid-auto-rows: 275px;
  }
  
  @media (min-width: 1366px) {
    height: 700px;
    overflow: hidden;
    gap: 24px;
    margin-bottom: 30px;
    grid-template-columns: repeat(auto-fit, 183px);
    grid-auto-rows: 275px;
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
  
  @media (max-width: 383px) {
    width: 150px;
    height: 225px;
  }
  
  @media (min-width: 384px) and (max-width: 1365px) {
    width: 183px;
    height: 275px;
  }
  
  @media (min-width: 1366px) {
    width: 183px;
    height: 275px;
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
  padding: 20px;
  display: flex;
  align-items: flex-end;
`;

export const MovieTitle = styled.h3`
  color: var(--color-white);
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: var(--text-secondary);
  font-size: 18px;
`;

export const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #fcc;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
`;

export const EmptyTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--text-primary);
`;

export const EmptyDescription = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 8px;
  height: 92px;
  width: 100%;
  
  @media (max-width: 414px) {
    height: 92px;
    margin-top: 30px;
  }
  
  /* Tablet */
  @media (min-width: 415px) and (max-width: 768px) {
    height: 92px;
    margin-top: 30px;
  }
  
  /* Desktop Small */
  @media (min-width: 769px) and (max-width: 1365px) {
    height: 92px;
    margin-top: 30px;
  }
  
  @media (min-width: 1366px) {
    height: 92px;
    margin-top: 20px;
  }
`;
