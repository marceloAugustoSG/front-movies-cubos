import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import FiltersModal from '../../components/FiltersModal';
import AddMovieDrawer from '../../components/AddMovieDrawer';
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
  const [appliedFilters, setAppliedFilters] = useState<any>({});
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(1);
  const moviesPerPage = 14;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);
  
  const navigate = useNavigate();


  const loadMovies = async (page: number = currentPage, filters: any = appliedFilters) => {
    try {
      setLoading(true);
      setError('');
      
      // Construir parâmetros de query para a API
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', moviesPerPage.toString());
      
      // Adicionar filtros se existirem
      if (filters.title) queryParams.append('title', filters.title);
      if (filters.releaseYear) queryParams.append('releaseYear', filters.releaseYear);
      if (filters.minDuration) queryParams.append('minDuration', filters.minDuration);
      if (filters.maxDuration) queryParams.append('maxDuration', filters.maxDuration);
      if (filters.minBudget) queryParams.append('minBudget', filters.minBudget);
      if (filters.maxBudget) queryParams.append('maxBudget', filters.maxBudget);
      if (searchTerm) queryParams.append('title', searchTerm);
      
      // Chamar a API
      const apiMovies = await moviesService.getMovies(page, moviesPerPage, filters);
      
      setMovies(apiMovies);
      setCurrentPage(page);
      
      // Se retornou menos filmes que o limite, é a última página
      if (apiMovies.length < moviesPerPage) {
        setTotalMovies((page - 1) * moviesPerPage + apiMovies.length);
      } else {
        // Se retornou o limite completo, pode haver mais páginas
        setTotalMovies(page * moviesPerPage + 1);
      }
      
    } catch (err) {
      setError('Erro ao carregar filmes');
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

  const handleApplyFilters = (filters: any) => {
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
    
    console.log('Filme adicionado:', newMovie);
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
    const timeoutId = setTimeout(() => {
      loadMovies(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  if (loading) {
    return (
      <S.MoviesContainer>
        <S.LoadingMessage>Carregando filmes...</S.LoadingMessage>
      </S.MoviesContainer>
    );
  }

  if (error) {
    return (
      <S.MoviesContainer>
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </S.MoviesContainer>
    );
  }

  return (
    <S.MoviesContainer>
      <S.ControlBar>
        <S.SearchAndButtons>
          <Input
            type="text"
            placeholder="Buscar filmes..."
            value={searchTerm}
            onChange={handleSearchChange}
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
        <S.MoviesGrid>
          {movies.map((movie) => (
            <S.MovieCard key={movie.id} onClick={() => handleMovieClick(movie.id)}>
              <S.MovieImage 
                src={movie.imageUrl || 'https://via.placeholder.com/300x450?text=Sem+Imagem'} 
                alt={movie.title} 
              />
              <S.MovieInfo>
                <S.MovieTitle>{movie.title}</S.MovieTitle>
                <S.MovieDescription>{movie.description}</S.MovieDescription>
                <S.MovieDetails>
                  <S.MovieDetail>Ano: {new Date(movie.releaseDate).getFullYear()}</S.MovieDetail>
                  <S.MovieDetail>Duração: {movie.duration} min</S.MovieDetail>
                  <S.MovieDetail>Orçamento: ${(movie.budget || 0).toLocaleString()}</S.MovieDetail>
                </S.MovieDetails>
              </S.MovieInfo>
            </S.MovieCard>
          ))}
        </S.MoviesGrid>
      </S.MoviesContent>

      {totalPages > 1 && (
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
      />
      
      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={handleCloseFilters}
        onApplyFilters={handleApplyFilters}
      />
    </S.MoviesContainer>
  );
};

export default MoviesPage;