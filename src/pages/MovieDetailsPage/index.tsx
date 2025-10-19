import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import InfoBlock from '../../components/InfoBlock';
import AddMovieDrawer from '../../components/AddMovieDrawer';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import ToastContainer from '../../components/ToastContainer';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../contexts/AuthContext';
import { moviesService } from '../../api/moviesService';
import type { Movie } from '../../types';
import * as S from './styles.ts';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toasts, removeToast, showSuccess } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        setError('');
        
        if (!id) {
          setError('ID do filme não fornecido');
          return;
        }
        
        if (!user) {
          setError('Usuário não autenticado');
          return;
        }
        
        const movieData = await moviesService.getMovieById(parseInt(id));
        
        if (movieData.userId !== user.id) {
          setError('Você não tem permissão para visualizar este filme');
          return;
        }
        
        setMovie(movieData);
        
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar filme';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id, user]);

  const handleBackClick = () => {
    navigate('/movies');
  };

  const handleEditClick = () => {
    setIsEditDrawerOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!movie) return;
    
    setIsDeleting(true);
    
    try {
      await moviesService.deleteMovie(movie.id);
      showSuccess('Ação efetuada com sucesso!');
      setIsDeleteModalOpen(false);
      
      setTimeout(() => {
        navigate('/movies');
      }, 1500);
    } catch (error: unknown) {
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditMovie = (updatedMovie: Movie, hasChanges?: boolean) => {
    setMovie(updatedMovie);
    setIsEditDrawerOpen(false);
    if (hasChanges) {
      showSuccess('Filme atualizado com sucesso!');
    }
  };

  const handleCloseEditDrawer = () => {
    setIsEditDrawerOpen(false);
  };

  if (loading) {
    return (
      <Layout>
        <S.MovieDetailsContainer>
          <S.LoadingMessage>Carregando filme...</S.LoadingMessage>
        </S.MovieDetailsContainer>
      </Layout>
    );
  }

  if (error || !movie) {
    return (
      <Layout>
        <S.MovieDetailsContainer>
          <S.ErrorMessage>{error || 'Filme não encontrado'}</S.ErrorMessage>
          <S.BackButton onClick={handleBackClick}>
            ← Voltar para filmes
          </S.BackButton>
        </S.MovieDetailsContainer>
      </Layout>
    );
  }

  const convertToEmbedUrl = (url: string): string => {
    if (!url) return '';
    
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    return url;
  };

  const genres = Array.isArray(movie.genres) ? movie.genres : (movie.genres?.split(', ') || ['AÇÃO', 'AVENTURA', 'FICÇÃO CIENTÍFICA']);
  const budget = movie.budget || 0;
  const revenue = movie.revenue || (budget + 332990000);
  const profit = movie.profit || (revenue - budget);
  const votes = movie.voteCount || 5704;

  return (
    <Layout>
      <S.MovieDetailsContainer>
        <S.BackButton onClick={handleBackClick}>
          ← Voltar para filmes
        </S.BackButton>
        
        <S.MovieContent>
          <S.MovieHeader>
            <S.TitleSection className="header-titles">
              <S.MovieTitle>{movie.title}</S.MovieTitle>
              <S.MovieOriginalTitle>Título original: {movie.originalTitle || movie.title}</S.MovieOriginalTitle>
              {movie.slogan && (
                <S.MovieTagline>{movie.slogan}</S.MovieTagline>
              )}
            </S.TitleSection>
            
            <S.ActionButtons className="header-buttons">
              <Button variant="secondary" onClick={handleDeleteClick}>
                Deletar
              </Button>
              <Button variant="primary" onClick={handleEditClick}>
                Editar
              </Button>
            </S.ActionButtons>
          </S.MovieHeader>
          
          <S.MovieGrid>
            <S.FirstColumn>
              <S.MovieImageContainer>
                <S.MovieImage 
                  src={movie.imageUrl || 'https://via.placeholder.com/300x450?text=Sem+Imagem'} 
                  alt={movie.title} 
                />
              </S.MovieImageContainer>
              
              <S.ActionButtons className="image-buttons">
                <Button variant="secondary" onClick={handleDeleteClick}>
                  Deletar
                </Button>
                <Button variant="primary" onClick={handleEditClick}>
                  Editar
                </Button>
              </S.ActionButtons>
              
              <S.TitleSection className="mobile-titles">
                <S.MovieTitle>{movie.title}</S.MovieTitle>
                <S.MovieOriginalTitle>Título original: {movie.originalTitle || movie.title}</S.MovieOriginalTitle>
                {movie.slogan && (
                  <S.MovieTagline>{movie.slogan}</S.MovieTagline>
                )}
              </S.TitleSection>
              
              <S.MobileInfoSection>
                <S.InfoRow>
                  <S.ClassificationBlock>
                    <InfoBlock 
                      title="CLASSIFICAÇÃO INDICATIVA" 
                      value={movie.ageRating || '13 anos'} 
                    />
                  </S.ClassificationBlock>
                  <S.VotesWithRating>
                    <InfoBlock 
                      title="VOTOS" 
                      value={votes.toLocaleString()} 
                    />
                    <S.RatingCircle rating={movie.rating || 67}>
                      <S.RatingPercentage>
                        <span className="number">{movie.rating || 67}</span>
                        <span className="percent">%</span>
                      </S.RatingPercentage>
                    </S.RatingCircle>
                  </S.VotesWithRating>
                </S.InfoRow>
                
                <S.FinancialRow>
                  <InfoBlock 
                    title="ORÇAMENTO" 
                    value={`$${(budget / 1000000).toFixed(0)}M`} 
                  />
                  <InfoBlock 
                    title="RECEITA" 
                    value={`$${(revenue / 1000000).toFixed(2)}M`} 
                  />
                  <InfoBlock 
                    title="LUCRO" 
                    value={`$${(profit / 1000000).toFixed(2)}M`} 
                  />
                </S.FinancialRow>
              </S.MobileInfoSection>
            </S.FirstColumn>
            
            <S.SecondColumn>
              <S.MovieTagline>{movie.slogan}</S.MovieTagline>
              
              <S.SynopsisSection>
                <S.SynopsisTitle>SINOPSE</S.SynopsisTitle>
                <S.DescriptionText>{movie.description}</S.DescriptionText>
              </S.SynopsisSection>
              
              <InfoBlock 
                title="GÊNEROS" 
                value={
                  <S.GenresList>
                    {genres.map((genre, index) => (
                      <S.GenreTag key={index}>{genre}</S.GenreTag>
                    ))}
                  </S.GenresList>
                } 
              />
            </S.SecondColumn>

            <S.ThirdColumn>
              <S.InfoRow>
                <S.ClassificationBlock>
                  <InfoBlock 
                    title="CLASSIFICAÇÃO INDICATIVA" 
                    value={movie.ageRating || '13 anos'} 
                  />
                </S.ClassificationBlock>
                <S.VotesWithRating>
                  <InfoBlock 
                    title="VOTOS" 
                    value={votes.toLocaleString()} 
                  />
                  <S.RatingCircle rating={movie.rating || 67}>
                    <S.RatingPercentage>
                      <span className="number">{movie.rating || 67}</span>
                      <span className="percent">%</span>
                    </S.RatingPercentage>
                  </S.RatingCircle>
                </S.VotesWithRating>
              </S.InfoRow>
              
              <S.InfoRow>
                <InfoBlock 
                  title="LANÇAMENTO" 
                  value={new Date(movie.releaseDate).toLocaleDateString('pt-BR')} 
                />
                <InfoBlock 
                  title="DURAÇÃO" 
                  value={`${Math.floor(movie.duration / 60)}h ${movie.duration % 60}m`} 
                />
              </S.InfoRow>
              
              <S.InfoRow>
                <InfoBlock 
                  title="SITUAÇÃO" 
                  value={movie.status || 'Lançado'} 
                />
                <InfoBlock 
                  title="IDIOMA" 
                  value={movie.language || 'Inglês'} 
                />
              </S.InfoRow>
              
              <S.FinancialRow>
                <InfoBlock 
                  title="ORÇAMENTO" 
                  value={`$${(budget / 1000000).toFixed(0)}M`} 
                />
                <InfoBlock 
                  title="RECEITA" 
                  value={`$${(revenue / 1000000).toFixed(2)}M`} 
                />
                <InfoBlock 
                  title="LUCRO" 
                  value={`$${(profit / 1000000).toFixed(2)}M`} 
                />
              </S.FinancialRow>
            </S.ThirdColumn>
          </S.MovieGrid>
        </S.MovieContent>
        
        <S.TrailerSection>
          <S.TrailerTitle>Trailer</S.TrailerTitle>
          <S.VideoContainer>
            {movie.trailerUrl ? (
              <S.VideoPlayer
                src={convertToEmbedUrl(movie.trailerUrl)}
                title={`${movie.title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <S.NoTrailerMessage>
                Trailer não disponível para este filme
              </S.NoTrailerMessage>
            )}
          </S.VideoContainer>
        </S.TrailerSection>
      </S.MovieDetailsContainer>
      
      <AddMovieDrawer
        isOpen={isEditDrawerOpen}
        onClose={handleCloseEditDrawer}
        onAddMovie={handleEditMovie}
        mode="edit"
        movieToEdit={movie}
      />
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        movieTitle={movie?.title || ''}
        isDeleting={isDeleting}
      />
      
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </Layout>
  );
};

export default MovieDetailsPage;
