import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import FiltersModal, { type MovieFilters } from '../../components/FiltersModal';
import AddMovieDrawer from '../../components/AddMovieDrawer';
import ToastContainer from '../../components/ToastContainer';
import CircleProgress from '../../components/CircleProgress';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../contexts/AuthContext';
import { moviesService } from '../../api/moviesService';
import type { Movie } from '../../types';
import * as S from './styles';

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isAddMovieDrawerOpen, setIsAddMovieDrawerOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<MovieFilters>({});
  const { toasts, removeToast, showSuccess, showInfo, showError } = useToast();
  const { user } = useAuth();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const moviesPerPage = 10;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);
  
  const hasInitialized = useRef(false);
  
  const navigate = useNavigate();


  const loadMovies = async (page: number = currentPage, filters: MovieFilters = appliedFilters, searchTitle?: string) => {
    try {
      setLoading(true);
      setError('');
      
      if (!user) {
        setError('Usuário não autenticado');
        return;
      }
      
      const searchFilters = {
        ...filters,
        title: searchTitle || searchTerm.trim() || filters.title,
        userId: user.id
      };
      
      const apiResponse = await moviesService.getMovies(page, moviesPerPage, searchFilters);
      
      setMovies(apiResponse.movies);
      setCurrentPage(page);
      setTotalMovies(apiResponse.pagination.total);
      
    } catch (err) {
      setError('Erro ao carregar filmes');
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const handleApplyFilters = (filters: MovieFilters) => {
    setAppliedFilters(filters);
    setIsFiltersModalOpen(false);
    loadMovies(1, filters);
  };

  const handleToggleFilters = () => {
    setIsFiltersModalOpen(prev => !prev);
  };

  const handleCloseFilters = () => {
    setIsFiltersModalOpen(false);
  };

  const handleToggleAddMovie = () => {
    setIsAddMovieDrawerOpen(prev => !prev);
  };

  const handleCloseAddMovie = () => {
    setIsAddMovieDrawerOpen(false);
  };

  const handleAddMovie = (newMovie: Movie) => {
    setMovies(prev => [newMovie, ...prev]);
    setTotalMovies(prev => prev + 1);
    setIsAddMovieDrawerOpen(false);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      loadMovies(page);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!hasInitialized.current) {
      loadMovies(1);
      hasInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim() !== '') {
        loadMovies(1, appliedFilters, searchTerm.trim());
      } else {
        loadMovies(1, appliedFilters);
      }
    }, searchTerm.trim() === '' ? 0 : 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, appliedFilters]);

  return (
    <S.MoviesContainer>
      <S.ControlBar>
        <S.SearchAndButtons>
          <Input
            type="text"
            placeholder="Buscar filmes..."
            value={searchTerm}
            onChange={handleSearchChange}
            variant="search"
            icon={<Search size={16} fill="currentColor" />}
          />
          <S.ButtonsRow>
            <Button variant="filter-toggle" onClick={handleToggleFilters}>
              Filtros
            </Button>
            <Button variant="add-movie" onClick={handleToggleAddMovie}>
              Adicionar Filme
            </Button>
          </S.ButtonsRow>
        </S.SearchAndButtons>
      </S.ControlBar>

      <S.MoviesContent>
        {loading && (
          <S.LoadingMessage>Carregando filmes...</S.LoadingMessage>
        )}
        
        {error && (
          <S.ErrorMessage>{error}</S.ErrorMessage>
        )}
        
        {!loading && !error && movies.length === 0 && (
          <S.EmptyState>
            <S.EmptyIcon>🎬</S.EmptyIcon>
            <S.EmptyTitle>Nenhum filme encontrado</S.EmptyTitle>
            <S.EmptyMessage>
              {searchTerm.trim() || Object.values(appliedFilters).some(value => value !== undefined && value !== '') 
                ? 'Tente ajustar os filtros ou termo de busca para encontrar mais filmes.'
                : 'Não há filmes cadastrados no momento.'
              }
            </S.EmptyMessage>
            {(!searchTerm.trim() && !Object.values(appliedFilters).some(value => value !== undefined && value !== '')) && (
              <S.EmptyAction>
              
              </S.EmptyAction>
            )}
          </S.EmptyState>
        )}
        
        {!loading && !error && movies.length > 0 && (
          <S.MoviesGrid>
          {movies.map((movie) => (
            <S.MovieCard key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
              <S.MovieImage 
                src={movie.imageUrl || 'https://via.placeholder.com/300x450?text=Sem+Imagem'} 
                alt={movie.title} 
              />
              <S.MovieOverlay>
                <S.MovieTitle>{movie.originalTitle || movie.title}</S.MovieTitle>
                <S.HoverGenres>
                  {movie.genres 
                    ? Array.isArray(movie.genres) 
                      ? movie.genres.map(genre => 
                          genre.trim().charAt(0).toUpperCase() + genre.trim().slice(1).toLowerCase()
                        ).join(', ')
                      : movie.genres.split(',').map(genre => 
                          genre.trim().charAt(0).toUpperCase() + genre.trim().slice(1).toLowerCase()
                        ).join(', ')
                    : 'Sem gênero'
                  }
                </S.HoverGenres>
              </S.MovieOverlay>
              <S.HoverOverlay>
                <CircleProgress rating={movie.rating || 67} size={120} />
              </S.HoverOverlay>
            </S.MovieCard>
          ))}
          </S.MoviesGrid>
        )}
      </S.MoviesContent>

      {totalPages > 1 && movies.length > 0 && (
        <S.PaginationContainer>
          <Button 
            variant="pagination-arrow" 
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            ‹
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              variant={currentPage === page ? 'pagination-active' : 'pagination'}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          
          <Button 
            variant="pagination-arrow" 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            ›
          </Button>
        </S.PaginationContainer>
      )}
      
      <AddMovieDrawer
        isOpen={isAddMovieDrawerOpen}
        onClose={handleCloseAddMovie}
        onAddMovie={handleAddMovie}
        onShowSuccess={showSuccess}
        onShowInfo={showInfo}
        onShowError={showError}
      />
      
      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={handleCloseFilters}
        onApplyFilters={handleApplyFilters}
      />
      
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </S.MoviesContainer>
  );
};

export default MoviesPage;