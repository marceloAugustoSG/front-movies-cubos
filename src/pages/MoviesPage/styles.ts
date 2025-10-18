import styled from 'styled-components';

export const MoviesContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 20px;
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

export const SearchContainer = styled.div`
  margin-bottom: 30px;
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 16px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

export const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const MovieCard = styled.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px var(--shadow);
  border: 1px solid var(--border-color);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px var(--shadow);
  }
`;

export const MovieImage = styled.div`
  width: 100%;
  height: 200px;
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 48px;
`;

export const MovieContent = styled.div`
  padding: 20px;
`;

export const MovieTitle = styled.h3`
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const MovieOriginalTitle = styled.p`
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 12px;
  font-style: italic;
`;

export const MovieDescription = styled.p`
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const MovieDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--text-muted);
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
