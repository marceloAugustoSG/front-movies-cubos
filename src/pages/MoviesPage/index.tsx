import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { moviesService } from '../../api/moviesService';
import Button from '../../components/Button';
import type { Movie } from '../../types';
import * as S from './styles';

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError('');
      const moviesData = await moviesService.getMovies();
      setMovies(moviesData);
    } catch (err) {
      setError('Erro ao carregar filmes. Tente novamente.');
      console.error('Erro ao carregar filmes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleMovieClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.originalTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(budget);
  };

  return (
    <S.MoviesContainer>
      <S.Header>
        <S.Title>🎬 Filmes</S.Title>
        <S.HeaderActions>
          <Button onClick={() => navigate('/movies/new')}>
            ➕ Adicionar Filme
          </Button>
        </S.HeaderActions>
      </S.Header>

      <S.SearchContainer>
        <S.SearchInput
          type="text"
          placeholder="🔍 Buscar filmes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </S.SearchContainer>

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

      {loading ? (
        <S.LoadingContainer>
          ⏳ Carregando filmes...
        </S.LoadingContainer>
      ) : filteredMovies.length === 0 ? (
        <S.EmptyState>
          <S.EmptyTitle>🎭 Nenhum filme encontrado</S.EmptyTitle>
          <S.EmptyDescription>
            {searchTerm ? 'Tente uma busca diferente.' : 'Comece adicionando seu primeiro filme!'}
          </S.EmptyDescription>
          {!searchTerm && (
            <Button onClick={() => navigate('/movies/new')}>
              ➕ Adicionar Primeiro Filme
            </Button>
          )}
        </S.EmptyState>
      ) : (
        <S.MoviesGrid>
          {filteredMovies.map((movie) => (
            <S.MovieCard key={movie.id} onClick={() => handleMovieClick(movie.id)}>
              <S.MovieImage>
                {movie.imageUrl ? (
                  <img 
                    src={movie.imageUrl} 
                    alt={movie.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  '🎬'
                )}
              </S.MovieImage>
              <S.MovieContent>
                <S.MovieTitle>{movie.title}</S.MovieTitle>
                <S.MovieOriginalTitle>{movie.originalTitle}</S.MovieOriginalTitle>
                <S.MovieDescription>{movie.description}</S.MovieDescription>
                <S.MovieDetails>
                  <span>📅 {formatDate(movie.releaseDate)}</span>
                  <span>⏱️ {formatDuration(movie.duration)}</span>
                  <span>💰 {formatBudget(movie.budget)}</span>
                </S.MovieDetails>
              </S.MovieContent>
            </S.MovieCard>
          ))}
        </S.MoviesGrid>
      )}
    </S.MoviesContainer>
  );
};

export default MoviesPage;
