import React, { useState, useEffect } from 'react';
import Drawer, { useDrawerContext } from '../../components/Drawer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import GenreSelector from '../../components/GenreSelector';
import { moviesService } from '../../api/moviesService';
import { emailService } from '../../api/emailService';
import { uploadService } from '../../api/uploadService';
import { useAuth } from '../../contexts/AuthContext';
import { isFutureRelease, shouldSendReminderToday, calculateReminderDelay } from '../../utils/movieReminder';
import type { CreateMovieRequest, UpdateMovieRequest, Movie } from '../../types';
import * as S from './styles';

interface MovieData {
  title: string;
  originalTitle?: string;
  slogan?: string;
  description?: string;
  releaseDate: string;
  duration: number;
  budget?: number;
  revenue?: number;
  profit?: number;
  imageUrl?: string;
  trailerUrl?: string;
  rating?: number;
  voteCount?: number;
  ageRating?: string;
  status?: string;
  language?: string;
  genres: string[];
}

interface MovieDataErrors {
  title?: string;
  originalTitle?: string;
  slogan?: string;
  description?: string;
  releaseDate?: string;
  duration?: string;
  budget?: string;
  revenue?: string;
  profit?: string;
  imageUrl?: string;
  trailerUrl?: string;
  rating?: string;
  voteCount?: string;
  ageRating?: string;
  status?: string;
  language?: string;
  genres?: string;
  general?: string;
}

interface AddMovieDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMovie: (movie: Movie, hasChanges?: boolean) => void;
  mode?: 'create' | 'edit';
  movieToEdit?: Movie;
  onShowSuccess?: (message: string) => void;
  onShowInfo?: (message: string) => void;
  onShowError?: (message: string) => void;
}

const statusOptions = [
  { value: 'Em produção', label: 'Em produção' },
  { value: 'Finalizado', label: 'Finalizado' },
  { value: 'Lançado', label: 'Lançado' },
  { value: 'Adiado', label: 'Adiado' },
  { value: 'Cancelado', label: 'Cancelado' }
];

const ageRatingOptions = [
  { value: 'Livre', label: 'Livre' },
  { value: '10 anos', label: '10 anos' },
  { value: '12 anos', label: '12 anos' },
  { value: '14 anos', label: '14 anos' },
  { value: '16 anos', label: '16 anos' },
  { value: '18 anos', label: '18 anos' }
];

const AddMovieDrawerContent: React.FC<Omit<AddMovieDrawerProps, 'isOpen'>> = ({ onClose, onAddMovie, mode = 'create', movieToEdit, onShowSuccess, onShowInfo, onShowError }) => {
  const { user } = useAuth();
  const [movieData, setMovieData] = useState<MovieData>({
    title: '',
    originalTitle: '',
    slogan: '',
    description: '',
    releaseDate: '',
    duration: 1,
    budget: 0,
    revenue: 0,
    profit: 0,
    imageUrl: '',
    trailerUrl: '',
    rating: 0,
    voteCount: 0,
    ageRating: '',
    status: '',
    language: '',
    genres: []
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [errors, setErrors] = useState<MovieDataErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const { onCloseWithAnimation } = useDrawerContext();

  useEffect(() => {
    if (mode === 'edit' && movieToEdit) {
      setMovieData({
        title: movieToEdit.title || '',
        originalTitle: movieToEdit.originalTitle || '',
        slogan: movieToEdit.slogan || '',
        description: movieToEdit.description || '',
        releaseDate: movieToEdit.releaseDate ? new Date(movieToEdit.releaseDate).toISOString().split('T')[0] : '',
        duration: movieToEdit.duration || 1,
        budget: movieToEdit.budget || 0,
        revenue: movieToEdit.revenue || 0,
        profit: movieToEdit.profit || 0,
        imageUrl: movieToEdit.imageUrl || '',
        trailerUrl: movieToEdit.trailerUrl || '',
        rating: movieToEdit.rating || 0,
        voteCount: movieToEdit.voteCount || 0,
        ageRating: movieToEdit.ageRating || '',
        status: movieToEdit.status || '',
        language: movieToEdit.language || '',
        genres: Array.isArray(movieToEdit.genres) 
          ? movieToEdit.genres 
          : movieToEdit.genres 
            ? movieToEdit.genres.split(',').map(g => g.trim()).filter(g => g)
            : []
      });
      
      if (movieToEdit.imageUrl) {
        setImagePreview(movieToEdit.imageUrl);
      }
    } else {
      setMovieData({
        title: '',
        originalTitle: '',
        slogan: '',
        description: '',
        releaseDate: '',
        duration: 1,
        budget: 0,
        revenue: 0,
        profit: 0,
        imageUrl: '',
        trailerUrl: '',
        rating: 0,
        voteCount: 0,
        ageRating: '',
        status: '',
        language: '',
        genres: []
      });
      setImagePreview('');
    }
  }, [mode, movieToEdit]);

  const hasChanges = () => {
    if (mode !== 'edit' || !movieToEdit) return true;
    
    const originalData = {
      title: movieToEdit.title || '',
      originalTitle: movieToEdit.originalTitle || '',
      slogan: movieToEdit.slogan || '',
      description: movieToEdit.description || '',
      releaseDate: movieToEdit.releaseDate ? new Date(movieToEdit.releaseDate).toISOString().split('T')[0] : '',
      duration: movieToEdit.duration || 1,
      budget: movieToEdit.budget || 0,
      revenue: movieToEdit.revenue || 0,
      profit: movieToEdit.profit || 0,
      imageUrl: movieToEdit.imageUrl || '',
      trailerUrl: movieToEdit.trailerUrl || '',
      rating: movieToEdit.rating || 0,
      voteCount: movieToEdit.voteCount || 0,
      ageRating: movieToEdit.ageRating || '',
      status: movieToEdit.status || '',
      language: movieToEdit.language || '',
      genres: movieToEdit.genres || ''
    };

    return JSON.stringify(originalData) !== JSON.stringify(movieData);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onShowError?.('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      onShowError?.('A imagem deve ter no máximo 5MB');
      return;
    }

    try {
      setIsUploadingImage(true);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
      
      const uploadedUrl = await uploadService.uploadImage(file);
      
      setMovieData(prev => ({ ...prev, imageUrl: uploadedUrl }));
      
      onShowSuccess?.('Imagem enviada com sucesso!');
      
    } catch (error) {
      onShowError?.(error instanceof Error ? error.message : 'Erro ao fazer upload da imagem');
      
      setImagePreview('');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: MovieDataErrors = {};
    
    if (!movieData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }
    
    if (!movieData.releaseDate) {
      newErrors.releaseDate = 'Data de lançamento é obrigatória';
    }
    
    if (movieData.duration < 1 || movieData.duration > 600) {
      newErrors.duration = 'Duração deve estar entre 1 e 600 minutos';
    }
    
    if (movieData.budget !== undefined && movieData.budget < 0) {
      newErrors.budget = 'Orçamento deve ser maior ou igual a 0';
    }
    
    if (movieData.revenue !== undefined && movieData.revenue < 0) {
      newErrors.revenue = 'Receita deve ser maior ou igual a 0';
    }
    
    if (movieData.profit !== undefined && movieData.profit < 0) {
      newErrors.profit = 'Lucro deve ser maior ou igual a 0';
    }
    
    if (movieData.description && !movieData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    
        if (movieData.imageUrl && movieData.imageUrl.trim() && !movieData.imageUrl.startsWith('data:')) {
          const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
          const isDataUrl = movieData.imageUrl.startsWith('data:');
          const isHttpUrl = movieData.imageUrl.startsWith('http://') || movieData.imageUrl.startsWith('https://');
          const isRelativeUrl = movieData.imageUrl.startsWith('/');
          
          if (!isDataUrl && !isHttpUrl && !isRelativeUrl && !urlPattern.test(movieData.imageUrl)) {
            newErrors.imageUrl = 'URL inválida';
          }
        }
    
    if (movieData.rating !== undefined && (movieData.rating < 0 || movieData.rating > 100)) {
      newErrors.rating = 'Rating deve estar entre 0 e 100';
    }
    
    if (movieData.voteCount !== undefined && movieData.voteCount < 0) {
      newErrors.voteCount = 'Número de votos deve ser maior ou igual a 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

      const handleAdd = async () => {
        if (!validateForm()) {
          return;
        }
        
        setIsSubmitting(true);
        
        try {
          const dataToSend: CreateMovieRequest = {
            title: movieData.title,
            originalTitle: movieData.originalTitle,
            slogan: movieData.slogan,
            description: movieData.description,
            releaseDate: movieData.releaseDate ? new Date(movieData.releaseDate).toISOString() : '',
            duration: movieData.duration,
            budget: movieData.budget,
            revenue: movieData.revenue,
            profit: movieData.profit,
            imageUrl: movieData.imageUrl,
            trailerUrl: movieData.trailerUrl,
            rating: movieData.rating,
            voteCount: movieData.voteCount,
            ageRating: movieData.ageRating,
            status: movieData.status,
            language: movieData.language,
            genres: movieData.genres,
            userId: (() => {
              const user = localStorage.getItem('user');
              return user ? JSON.parse(user).id : '';
            })()
          };
          
          if (mode === 'edit' && movieToEdit) {
            const updateData: UpdateMovieRequest = {
              title: movieData.title,
              originalTitle: movieData.originalTitle,
              slogan: movieData.slogan,
              description: movieData.description,
              releaseDate: movieData.releaseDate ? new Date(movieData.releaseDate).toISOString() : '',
              duration: movieData.duration,
              budget: movieData.budget,
              revenue: movieData.revenue,
              profit: movieData.profit,
              imageUrl: movieData.imageUrl,
              trailerUrl: movieData.trailerUrl,
              rating: movieData.rating,
              voteCount: movieData.voteCount,
              ageRating: movieData.ageRating,
              status: movieData.status,
              language: movieData.language,
              genres: movieData.genres
            };
            
            const updatedMovie = await moviesService.updateMovie(movieToEdit.id, updateData);
            
            if (user?.email && isFutureRelease(movieData.releaseDate)) {
              try {
                const delay = calculateReminderDelay(movieData.releaseDate);

                if (shouldSendReminderToday(movieData.releaseDate)) {
                  await emailService.sendMovieReminderEmail(
                    user.email,
                    movieData.title,
                    movieData.releaseDate,
                    movieData.imageUrl
                  );
                  onShowSuccess?.('📧 Email de lembrete enviado! Você receberá uma notificação sobre a estreia de hoje.');
                } else if (delay > 0) {
                  setTimeout(async () => {
                    try {
                      await emailService.sendMovieReminderEmail(
                        user.email!,
                        movieData.title,
                        movieData.releaseDate,
                        movieData.imageUrl
                      );
                    } catch (error) {
                      onShowError?.('Erro ao enviar email de lembrete');
                    }
                  }, delay);

                  const today = new Date();
                  let releaseDate: Date;
                  if (movieData.releaseDate.includes('-') && movieData.releaseDate.length === 10) {
                    const [year, month, day] = movieData.releaseDate.split('-').map(Number);
                    releaseDate = new Date(year, month - 1, day);
                  } else {
                    releaseDate = new Date(movieData.releaseDate);
                  }

                  const todayStr = today.toLocaleDateString('pt-BR');
                  const releaseDateStr = releaseDate.toLocaleDateString('pt-BR');
                  const todayLocal = new Date(todayStr.split('/').reverse().join('-'));
                  const releaseDateLocal = new Date(releaseDateStr.split('/').reverse().join('-'));

                  const daysUntilRelease = Math.ceil((releaseDateLocal.getTime() - todayLocal.getTime()) / (1000 * 3600 * 24));

                  let dayText = '';
                  if (daysUntilRelease === 1) {
                    dayText = 'amanhã';
                  } else if (daysUntilRelease === 2) {
                    dayText = 'depois de amanhã';
                  } else {
                    dayText = `em ${daysUntilRelease} dias`;
                  }

                  onShowInfo?.(`📅 Lembrete agendado! Você receberá um email ${dayText} sobre a estreia de "${movieData.title}".`);
                }
              } catch (error) {
                onShowError?.('⚠️ Não foi possível agendar o lembrete por email, mas o filme foi atualizado com sucesso.');
              }
            }

            if (!user?.email || !isFutureRelease(movieData.releaseDate)) {
              onShowSuccess?.('Filme atualizado com sucesso!');
            }
            
            onAddMovie(updatedMovie, hasChanges());
          } else {
            const createdMovie = await moviesService.createMovie(dataToSend);
            
            if (user?.email && isFutureRelease(movieData.releaseDate)) {
              try {
                const delay = calculateReminderDelay(movieData.releaseDate);
                
                if (shouldSendReminderToday(movieData.releaseDate)) {
                  await emailService.sendMovieReminderEmail(
                    user.email,
                    movieData.title,
                    movieData.releaseDate,
                    movieData.imageUrl
                  );
                  onShowSuccess?.('📧 Email de lembrete enviado! Você receberá uma notificação sobre a estreia de hoje.');
                } else if (delay > 0) {
                  setTimeout(async () => {
                    try {
                      await emailService.sendMovieReminderEmail(
                        user.email!,
                        movieData.title,
                        movieData.releaseDate,
                        movieData.imageUrl
                      );
                    } catch (error) {
                      onShowError?.('Erro ao enviar email de lembrete');
                    }
                  }, delay);
                  
                  const today = new Date();
                  
                  let releaseDate: Date;
                  if (movieData.releaseDate.includes('-') && movieData.releaseDate.length === 10) {
                    const [year, month, day] = movieData.releaseDate.split('-').map(Number);
                      releaseDate = new Date(year, month - 1, day);
                  } else {
                    releaseDate = new Date(movieData.releaseDate);
                  }
                  
                  const todayStr = today.toLocaleDateString('pt-BR');
                  const releaseDateStr = releaseDate.toLocaleDateString('pt-BR');
                  const todayLocal = new Date(todayStr.split('/').reverse().join('-'));
                  const releaseDateLocal = new Date(releaseDateStr.split('/').reverse().join('-'));
                  
                  const daysUntilRelease = Math.ceil((releaseDateLocal.getTime() - todayLocal.getTime()) / (1000 * 3600 * 24));
                  
                  let dayText = '';
                  if (daysUntilRelease === 1) {
                    dayText = 'amanhã';
                  } else if (daysUntilRelease === 2) {
                    dayText = 'depois de amanhã';
                  } else {
                    dayText = `em ${daysUntilRelease} dias`;
                  }
                  
                  onShowInfo?.(`📅 Lembrete agendado! Você receberá um email ${dayText} sobre a estreia de "${movieData.title}".`);
                }
              } catch (error) {
                onShowError?.('⚠️ Não foi possível agendar o lembrete por email, mas o filme foi criado com sucesso.');
              }
            }
            
            if (!user?.email || !isFutureRelease(movieData.releaseDate)) {
              onShowSuccess?.('Filme adicionado com sucesso!');
            }
            
            onAddMovie(createdMovie);
          }
          
          onClose();
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Erro ao adicionar filme';
          setErrors({ general: errorMessage });
        } finally {
          setIsSubmitting(false);
        }
      };

  const handleCancel = () => {
    setMovieData({
      title: '',
      originalTitle: '',
      slogan: '',
      description: '',
      releaseDate: '',
      duration: 1,
      budget: 0,
      revenue: 0,
      profit: 0,
      imageUrl: '',
      rating: 0,
      voteCount: 0,
      ageRating: '',
      status: '',
      language: '',
      genres: []
    });
    setImagePreview('');
    setIsUploadingImage(false);
    setErrors({});
    onCloseWithAnimation();
  };

      return (
        <>
          <S.DrawerContent>
            {errors.general && (
              <S.ErrorMessage style={{ marginBottom: '16px', textAlign: 'center' }}>
                {errors.general}
              </S.ErrorMessage>
            )}
            <S.FormSection>
              <S.FormLabel>Título do Filme</S.FormLabel>
              <Input
                type="text"
                placeholder="Digite o título do filme"
                value={movieData.title}
                onChange={(e) => {
                  setMovieData(prev => ({ ...prev, title: e.target.value }));
                  if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
                }}
              />
              {errors.title && <S.ErrorMessage>{errors.title}</S.ErrorMessage>}
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>Título Original</S.FormLabel>
              <Input
                type="text"
                placeholder="Digite o título original"
                value={movieData.originalTitle}
                onChange={(e) => {
                  setMovieData(prev => ({ ...prev, originalTitle: e.target.value }));
                  if (errors.originalTitle) setErrors(prev => ({ ...prev, originalTitle: undefined }));
                }}
              />
              {errors.originalTitle && <S.ErrorMessage>{errors.originalTitle}</S.ErrorMessage>}
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>Slogan</S.FormLabel>
              <Input
                type="text"
                placeholder="Digite o slogan do filme"
                value={movieData.slogan}
                onChange={(e) => {
                  setMovieData(prev => ({ ...prev, slogan: e.target.value }));
                  if (errors.slogan) setErrors(prev => ({ ...prev, slogan: undefined }));
                }}
              />
              {errors.slogan && <S.ErrorMessage>{errors.slogan}</S.ErrorMessage>}
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>Data de Lançamento</S.FormLabel>
              <Input
                type="date"
                value={movieData.releaseDate}
                onChange={(e) => {
                  setMovieData(prev => ({ ...prev, releaseDate: e.target.value }));
                  if (errors.releaseDate) setErrors(prev => ({ ...prev, releaseDate: undefined }));
                }}
              />
              {errors.releaseDate && <S.ErrorMessage>{errors.releaseDate}</S.ErrorMessage>}
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>Duração (minutos)</S.FormLabel>
              <Input
                type="number"
                placeholder="Ex: 120"
                min="1"
                max="600"
                value={movieData.duration ? String(movieData.duration) : ''}
                onChange={(e) => {
                  const duration = e.target.value ? parseInt(e.target.value) : 0;
                  setMovieData(prev => ({ ...prev, duration }));
                  if (errors.duration) setErrors(prev => ({ ...prev, duration: undefined }));
                }}
              />
              {errors.duration && <S.ErrorMessage>{errors.duration}</S.ErrorMessage>}
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>Orçamento (USD)</S.FormLabel>
              <Input
                type="number"
                placeholder="Ex: 1000000"
                min="0"
                value={movieData.budget ? String(movieData.budget) : ''}
                onChange={(e) => {
                  const budget = e.target.value ? parseFloat(e.target.value) : 0;
                  setMovieData(prev => ({ ...prev, budget }));
                  if (errors.budget) setErrors(prev => ({ ...prev, budget: undefined }));
                }}
              />
              {errors.budget && <S.ErrorMessage>{errors.budget}</S.ErrorMessage>}
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>Receita (USD)</S.FormLabel>
              <Input
                type="number"
                placeholder="Ex: 2000000"
                min="0"
                value={movieData.revenue ? String(movieData.revenue) : ''}
                onChange={(e) => {
                  const revenue = e.target.value ? parseFloat(e.target.value) : 0;
                  setMovieData(prev => ({ ...prev, revenue }));
                  if (errors.revenue) setErrors(prev => ({ ...prev, revenue: undefined }));
                }}
              />
              {errors.revenue && <S.ErrorMessage>{errors.revenue}</S.ErrorMessage>}
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>Lucro (USD)</S.FormLabel>
              <Input
                type="number"
                placeholder="Ex: 1000000"
                min="0"
                value={movieData.profit ? String(movieData.profit) : ''}
                onChange={(e) => {
                  const profit = e.target.value ? parseFloat(e.target.value) : 0;
                  setMovieData(prev => ({ ...prev, profit }));
                  if (errors.profit) setErrors(prev => ({ ...prev, profit: undefined }));
                }}
              />
              {errors.profit && <S.ErrorMessage>{errors.profit}</S.ErrorMessage>}
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>Rating (0-100)</S.FormLabel>
              <Input
                type="number"
                placeholder="Ex: 85"
                min="0"
                max="100"
                value={movieData.rating ? String(movieData.rating) : ''}
                onChange={(e) => {
                  const rating = e.target.value ? parseInt(e.target.value) : 0;
                  setMovieData(prev => ({ ...prev, rating }));
                  if (errors.rating) setErrors(prev => ({ ...prev, rating: undefined }));
                }}
              />
              {errors.rating && <S.ErrorMessage>{errors.rating}</S.ErrorMessage>}
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>Número de Votos</S.FormLabel>
              <Input
                type="number"
                placeholder="Ex: 1500"
                min="0"
                value={movieData.voteCount ? String(movieData.voteCount) : ''}
                onChange={(e) => {
                  const voteCount = e.target.value ? parseInt(e.target.value) : 0;
                  setMovieData(prev => ({ ...prev, voteCount }));
                  if (errors.voteCount) setErrors(prev => ({ ...prev, voteCount: undefined }));
                }}
              />
              {errors.voteCount && <S.ErrorMessage>{errors.voteCount}</S.ErrorMessage>}
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>Classificação Indicativa</S.FormLabel>
              <Select
                value={movieData.ageRating}
                onChange={(e) => {
                  setMovieData(prev => ({ ...prev, ageRating: e.target.value }));
                  if (errors.ageRating) setErrors(prev => ({ ...prev, ageRating: undefined }));
                }}
                options={ageRatingOptions}
                placeholder="Selecione a classificação"
                name="ageRating"
              />
              {errors.ageRating && <S.ErrorMessage>{errors.ageRating}</S.ErrorMessage>}
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>Status</S.FormLabel>
              <Select
                value={movieData.status}
                onChange={(e) => {
                  setMovieData(prev => ({ ...prev, status: e.target.value }));
                  if (errors.status) setErrors(prev => ({ ...prev, status: undefined }));
                }}
                options={statusOptions}
                placeholder="Selecione o status"
                name="status"
              />
              {errors.status && <S.ErrorMessage>{errors.status}</S.ErrorMessage>}
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>Idioma</S.FormLabel>
              <Input
                type="text"
                placeholder="Ex: Inglês"
                value={movieData.language}
                onChange={(e) => {
                  setMovieData(prev => ({ ...prev, language: e.target.value }));
                  if (errors.language) setErrors(prev => ({ ...prev, language: undefined }));
                }}
              />
              {errors.language && <S.ErrorMessage>{errors.language}</S.ErrorMessage>}
            </S.FormSection>

            <S.FormSection>
              <GenreSelector
                genres={movieData.genres}
                onChange={(genres) => {
                  setMovieData(prev => ({ ...prev, genres }));
                  if (errors.genres) setErrors(prev => ({ ...prev, genres: undefined }));
                }}
                placeholder="Digite um gênero"
                disabled={isSubmitting}
              />
              {errors.genres && <S.ErrorMessage>{errors.genres}</S.ErrorMessage>}
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>Imagem do Filme (opcional)</S.FormLabel>
              <S.ImageInputContainer>
                <Input
                  type="url"
                  placeholder="https://exemplo.com/imagem.jpg (opcional)"
                  value={movieData.imageUrl || ''}
                  onChange={(e) => {
                    setMovieData(prev => ({ ...prev, imageUrl: e.target.value }));
                    if (errors.imageUrl) setErrors(prev => ({ ...prev, imageUrl: undefined }));
                    if (!e.target.value.startsWith('data:')) {
                      setImagePreview('');
                    }
                  }}
                />
                <S.UploadButton $disabled={isUploadingImage}>
                  <S.FileInput
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploadingImage}
                  />
                  <S.UploadLabel>
                    {isUploadingImage ? '⏳ Enviando...' : '📁 Upload'}
                  </S.UploadLabel>
                </S.UploadButton>
              </S.ImageInputContainer>
              {errors.imageUrl && <S.ErrorMessage>{errors.imageUrl}</S.ErrorMessage>}
              <S.ImagePreview>
                {(imagePreview || movieData.imageUrl) && (
                  <S.PreviewImage 
                    src={imagePreview || movieData.imageUrl} 
                    alt="Preview da imagem"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </S.ImagePreview>
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>URL do Trailer (opcional)</S.FormLabel>
              <Input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={movieData.trailerUrl || ''}
                onChange={(e) => {
                  setMovieData(prev => ({ ...prev, trailerUrl: e.target.value }));
                  if (errors.trailerUrl) setErrors(prev => ({ ...prev, trailerUrl: undefined }));
                }}
                name="trailerUrl"
              />
              {errors.trailerUrl && <S.ErrorMessage>{errors.trailerUrl}</S.ErrorMessage>}
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>Descrição</S.FormLabel>
              <S.TextArea
                placeholder="Digite a descrição do filme"
                value={movieData.description}
                onChange={(e) => {
                  setMovieData(prev => ({ ...prev, description: e.target.value }));
                  if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
                }}
                rows={4}
              />
              {errors.description && <S.ErrorMessage>{errors.description}</S.ErrorMessage>}
            </S.FormSection>
          </S.DrawerContent>

      <S.DrawerActions>
        <Button variant="drawer-cancel" onClick={handleCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button variant="drawer-add" onClick={handleAdd} disabled={isSubmitting}>
          {isSubmitting 
            ? (mode === 'edit' ? 'Salvando...' : 'Adicionando...') 
            : (mode === 'edit' ? 'Salvar Alterações' : 'Adicionar Filme')
          }
        </Button>
      </S.DrawerActions>
    </>
  );
};

const AddMovieDrawer: React.FC<AddMovieDrawerProps> = ({ isOpen, onClose, onAddMovie, mode = 'create', movieToEdit, onShowSuccess, onShowInfo, onShowError }) => {
  const title = mode === 'edit' ? 'Editar filme' : 'Adicionar filme';
  
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={title}>
      <AddMovieDrawerContent onClose={onClose} onAddMovie={onAddMovie} mode={mode} movieToEdit={movieToEdit} onShowSuccess={onShowSuccess} onShowInfo={onShowInfo} onShowError={onShowError} />
    </Drawer>
  );
};

export default AddMovieDrawer;
