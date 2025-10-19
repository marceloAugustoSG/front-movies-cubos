import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import InfoBlock from '../../components/InfoBlock';
import { moviesService } from '../../api/moviesService';
import type { Movie } from '../../types';
import * as S from './styles.ts';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        setError('');
        
        if (!id) {
          setError('ID do filme não fornecido');
          return;
        }
        
        const movieData = await moviesService.getMovieById(parseInt(id));
        setMovie(movieData);
        
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar filme');
        console.error('Erro ao carregar filme:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  const handleBackClick = () => {
    navigate('/movies');
  };

  const handleEditClick = () => {
    console.log('Editar filme:', movie?.id);
  };

  const handleDeleteClick = () => {
    console.log('Deletar filme:', movie?.id);
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
    
    // Se já é uma URL de embed, retorna como está
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    // Converte URL do YouTube para formato embed
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    // Se não conseguir converter, retorna a URL original
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
              <S.MovieTagline>Todo herói tem um começo.</S.MovieTagline>
              
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
    </Layout>
  );
};

export default MovieDetailsPage;
