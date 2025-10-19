import styled from 'styled-components';

export const MovieDetailsContainer = styled.div`
  min-height: calc(100vh - 140px);
  background: transparent;
  padding: 20px 64px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  gap: 40px;
  
  @media (max-width: 1024px) {
    padding: 20px 32px;
  }
  
  @media (max-width: 768px) {
    padding: 15px 20px;
    min-height: calc(100vh - 120px);
    gap: 30px;
  }
  
  @media (max-width: 480px) {
    padding: 15px;
    gap: 20px;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s ease;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  align-self: flex-start;

  &:hover {
    color: var(--button-primary-bg);
  }

  &:active {
    color: var(--button-primary-active);
  }
`;

export const MovieContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const MovieHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: start;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  &.header-titles {
    display: flex;
  }
  
  &.mobile-titles {
    display: none;
    margin-top: 16px;
    text-align: center;
    
    @media (max-width: 753px) {
      display: flex;
    }
  }
`;

export const MobileInfoSection = styled.div`
  display: none;
  margin-top: 16px;
  
  @media (max-width: 753px) {
    display: block;
    
    .info-block-title {
      font-size: 10px !important;
    }
    
    .info-block-value {
      font-size: 12px !important;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  
  &.header-buttons {
    @media (max-width: 753px) {
      display: none;
    }
  }
  
  &.image-buttons {
    display: none;
    justify-content: center;
    margin-top: 16px;
    
    @media (max-width: 753px) {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    
    @media (max-width: 414px) {
      flex-direction: row;
      gap: 8px;
      
      button:first-child {
        flex: 1;
      }
      
      button:last-child {
        flex: 2;
      }
    }
  }
`;

export const MovieGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: auto 1fr 416px;
  align-items: start;
  
  @media (max-width: 1366px) and (min-width: 1025px) {
    grid-template-columns: auto 416px;
    grid-template-areas: 
      "image info"
      "synopsis synopsis";
  }
  
  @media (max-width: 1025px) {
    grid-template-columns: auto 416px;
    grid-template-rows: auto auto;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: auto 1fr 300px;
    grid-template-rows: auto;
    gap: 12px;
  }
  
  @media (max-width: 769px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1366px) and (min-width: 1025px) {
    grid-area: image;
  }
  
  @media (max-width: 1025px) {
    grid-row: 1;
    grid-column: 1;
  }
  
  @media (max-width: 769px) {
    grid-row: unset;
    grid-column: unset;
  }
`;

export const MovieTitle = styled.h1`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 100%;
  letter-spacing: 0px;
  color: var(--synopsis-text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 1024px) {
    font-size: 28px;
  }
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const MovieOriginalTitle = styled.p`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0px;
  color: var(--synopsis-text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 1366px) and (min-width: 1025px) {
    grid-area: synopsis;
  }
  
  @media (max-width: 1025px) {
    grid-row: 2;
    grid-column: 1 / -1;
    max-width: 600px;
  }
  
  @media (max-width: 769px) {
    grid-row: unset;
    grid-column: unset;
    max-width: unset;
  }
`;

export const ThirdColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 1366px) and (min-width: 1025px) {
    grid-area: info;
  }
  
  @media (max-width: 1025px) {
    grid-row: 1;
    grid-column: 2;
  }
  
  @media (max-width: 769px) {
    grid-row: unset;
    grid-column: unset;
  }
`;

export const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  align-items: stretch;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  @media (max-width: 753px) {
    grid-template-columns: 1fr 1fr auto;
    gap: 8px;
    align-items: center;
    min-height: 60px;
  }
`;

export const ClassificationBlock = styled.div`
  width: 211px;
  height: 69px;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
  
  @media (max-width: 753px) {
    width: auto;
    height: 60px;
    display: flex;
    align-items: center;
  }
`;

export const VotesWithRating = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 69px;
  
  @media (max-width: 768px) {
    justify-content: space-between;
    gap: 16px;
    height: auto;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
  
  @media (max-width: 753px) {
    flex-direction: row;
    gap: 8px;
    align-items: center;
    height: 60px;
  }
`;

interface RatingCircleProps {
  rating: number;
}

export const RatingCircle = styled.div<RatingCircleProps>`
  width: 98px;
  height: 98px;
  border-radius: 50%;
  background: conic-gradient(from 90deg, var(--rating-circle-progress) 0deg, var(--rating-circle-progress) ${props => props.rating * 3.6}deg, var(--rating-circle-empty) ${props => props.rating * 3.6}deg, var(--rating-circle-empty) 360deg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: var(--rating-circle-bg);
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    
    &::before {
      width: 65px;
      height: 65px;
    }
  }
  
  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
    
    &::before {
      width: 55px;
      height: 55px;
    }
  }
  
  @media (max-width: 753px) {
    width: 60px;
    height: 60px;
    
    &::before {
      width: 48px;
      height: 48px;
    }
  }
`;

export const RatingPercentage = styled.span`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-size: 16px;
  z-index: 2;
  position: relative;
  
  .number {
    color: var(--rating-text-number);
  }
  
  .percent {
    color: var(--rating-text-percent);
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
  
  @media (max-width: 753px) {
    font-size: 10px;
  }
`;

export const FinancialRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  @media (max-width: 753px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    margin-top: 16px;
  }
`;

export const MovieImageContainer = styled.div`
  position: relative;
  width: 374px;
  height: 542px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    width: 300px;
    height: 435px;
  }
  
  @media (max-width: 768px) {
    width: 280px;
    height: 406px;
  }
  
  @media (max-width: 480px) {
    width: 250px;
    height: 363px;
  }
  
  @media (max-width: 753px) {
    width: 100%;
    height: auto;
    aspect-ratio: 374/542;
  }
`;

export const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  object-fit: cover;
`;

export const MovieInfo = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 24px;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
`;

export const RightColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  flex: 1;
`;

export const TaglineAndActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

export const MovieTagline = styled.p`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.4;
  color: var(--text-primary);
  margin: 39px 16px;
  font-style: italic;
  flex: 1;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin: 20px 0;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin: 15px 0;
  }
  
  @media (max-width: 753px) {
    text-align: center;
    margin: 16px 0;
  }
`;

export const MovieDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DescriptionText = styled.p`
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: var(--synopsis-text);
  margin: 0;
`;

export const GenresSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const GenresTitle = styled.h3`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: var(--text-primary);
  margin: 0;
`;

export const GenresList = styled.div`
  display: inline-flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const GenreTag = styled.span`
  background-color: var(--genre-bg);
  color: var(--genre-text);
  padding: 8px;
  border-radius: 4px;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  white-space: nowrap;
  display: inline-block;
`;

export const MovieDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 20px;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-primary);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DetailLabel = styled.span`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: var(--text-secondary);
  text-transform: uppercase;
`;

export const DetailValue = styled.span`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--text-primary);
`;

export const RatingItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: span 1;
`;


export const SynopsisSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: var(--synopsis-bg);
  padding: 16px;
  border-radius: 8px;
`;

export const SynopsisTitle = styled.h3`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: var(--text-primary);
  margin: 0;
`;

export const TrailerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TrailerTitle = styled.h2`
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: var(--text-primary);
  margin: 0;
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  border-radius: 8px;
  overflow: hidden;
`;

export const VideoPlayer = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

export const NoTrailerMessage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--card-bg);
  color: var(--text-secondary);
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  border-radius: 8px;
`;

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 18px;
  color: var(--text-primary);
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 18px;
  color: var(--text-primary);
  text-align: center;
`;
