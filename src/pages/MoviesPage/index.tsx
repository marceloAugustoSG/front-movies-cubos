import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import FiltersModal from '../../components/FiltersModal';
import AddMovieDrawer from '../../components/AddMovieDrawer';
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

  const mockMovies: Movie[] = [
    {
      id: 1,
      title: "Capitã Marvel",
      originalTitle: "Captain Marvel",
      description: "Uma guerreira alienígena que se torna uma das mais poderosas heroínas do universo.",
      releaseDate: "2019-03-08T00:00:00.000Z",
      duration: 124,
      budget: 152000000,
      imageUrl: "https://image.tmdb.org/t/p/w500/AtsgWhDnODqQWklEo1i0t8i2e.jpg",
      createdAt: "2025-01-17T20:05:42.229Z",
      updatedAt: "2025-01-17T20:05:42.229Z",
      userId: "8e0334a3-55cc-4fba-9d9f-72fce3450773",
      user: { id: "8e0334a3-55cc-4fba-9d9f-72fce3450773", name: "joao", email: "jo.soares@hotmail.com" }
    }
  ];

  const loadMovies = async (page: number = currentPage, filters: any = appliedFilters) => {
    try {
      setLoading(true);
      setError('');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredMovies = [...mockMovies];
      
      if (filters.title) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.title.toLowerCase().includes(filters.title.toLowerCase())
        );
      }
      
      if (filters.releaseYear) {
        const year = new Date(filters.releaseYear, 0, 1).getFullYear();
        filteredMovies = filteredMovies.filter(movie => 
          new Date(movie.releaseDate).getFullYear() === year
        );
      }
      
      if (filters.minDuration) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.duration >= filters.minDuration
        );
      }
      
      if (filters.maxDuration) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.duration <= filters.maxDuration
        );
      }
      
      if (filters.minBudget) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.budget >= filters.minBudget
        );
      }
      
      if (filters.maxBudget) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.budget <= filters.maxBudget
        );
      }
      
      if (searchTerm) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      const startIndex = (page - 1) * moviesPerPage;
      const endIndex = startIndex + moviesPerPage;
      const paginatedMovies = filteredMovies.slice(startIndex, endIndex);
      
      setMovies(paginatedMovies);
      setTotalMovies(filteredMovies.length);
      setCurrentPage(page);
      
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

  const handleAddMovie = (movieData: any) => {
    const newId = Math.max(...movies.map(m => m.id), 0) + 1;
    
    const newMovie: Movie = {
      id: newId,
      title: movieData.title,
      originalTitle: movieData.title,
      description: movieData.description,
      releaseDate: new Date(movieData.releaseYear, 0, 1).toISOString(),
      duration: movieData.duration,
      budget: movieData.budget,
      imageUrl: movieData.imageUrl || "https://via.placeholder.com/300x450?text=Novo+Filme",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "current-user-id",
      user: {
        id: "current-user-id",
        email: "user@example.com",
        name: "Usuário Atual"
      }
    };
    
    setMovies(prev => [newMovie, ...prev]);
    setTotalMovies(prev => prev + 1);
    
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
              <S.MovieImage src={movie.imageUrl} alt={movie.title} />
              <S.MovieInfo>
                <S.MovieTitle>{movie.title}</S.MovieTitle>
                <S.MovieDescription>{movie.description}</S.MovieDescription>
                <S.MovieDetails>
                  <S.MovieDetail>Ano: {new Date(movie.releaseDate).getFullYear()}</S.MovieDetail>
                  <S.MovieDetail>Duração: {movie.duration} min</S.MovieDetail>
                  <S.MovieDetail>Orçamento: ${movie.budget.toLocaleString()}</S.MovieDetail>
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