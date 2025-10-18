import React, { useState } from 'react';
import Drawer, { useDrawerContext } from '../../components/Drawer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import * as S from './styles';

interface MovieData {
  title: string;
  releaseYear: number;
  duration: number;
  budget: number;
  description: string;
  imageUrl: string;
}

interface MovieDataErrors {
  title?: string;
  releaseYear?: string;
  duration?: string;
  budget?: string;
  description?: string;
  imageUrl?: string;
}

interface AddMovieDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMovie: (movie: MovieData) => void;
}

const AddMovieDrawerContent: React.FC<Omit<AddMovieDrawerProps, 'isOpen'>> = ({ onClose, onAddMovie }) => {
  const [movieData, setMovieData] = useState<MovieData>({
    title: '',
    releaseYear: new Date().getFullYear(),
    duration: 1,
    budget: 0,
    description: '',
    imageUrl: ''
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [errors, setErrors] = useState<MovieDataErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { onCloseWithAnimation } = useDrawerContext();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setMovieData(prev => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: MovieDataErrors = {};
    
    if (!movieData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }
    
    if (!movieData.releaseYear || movieData.releaseYear < 1900 || movieData.releaseYear > new Date().getFullYear() + 5) {
      newErrors.releaseYear = 'Ano deve estar entre 1900 e ' + (new Date().getFullYear() + 5);
    }
    
    if (movieData.duration < 1 || movieData.duration > 600) {
      newErrors.duration = 'Duração deve estar entre 1 e 600 minutos';
    }
    
    if (movieData.budget < 0) {
      newErrors.budget = 'Orçamento deve ser maior ou igual a 0';
    }
    
    if (!movieData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    
    if (movieData.imageUrl.trim()) {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(movieData.imageUrl) && !movieData.imageUrl.startsWith('data:')) {
        newErrors.imageUrl = 'URL inválida';
      }
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      onAddMovie(movieData);
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar filme:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setMovieData({
      title: '',
      releaseYear: new Date().getFullYear(),
      duration: 1,
      budget: 0,
      description: '',
      imageUrl: ''
    });
    setImagePreview('');
    setErrors({});
    onCloseWithAnimation();
  };

  return (
    <>
      <S.DrawerContent>
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
          <S.FormLabel>Ano de Lançamento</S.FormLabel>
          <Input
            type="number"
            placeholder="Ex: 2023"
            min="1900"
            max={String(new Date().getFullYear() + 5)}
            value={movieData.releaseYear ? String(movieData.releaseYear) : ''}
            onChange={(e) => {
              const year = e.target.value ? parseInt(e.target.value) : 0;
              setMovieData(prev => ({ ...prev, releaseYear: year }));
              if (errors.releaseYear) setErrors(prev => ({ ...prev, releaseYear: undefined }));
            }}
          />
          {errors.releaseYear && <S.ErrorMessage>{errors.releaseYear}</S.ErrorMessage>}
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
              const budget = e.target.value ? parseInt(e.target.value) : 0;
              setMovieData(prev => ({ ...prev, budget }));
              if (errors.budget) setErrors(prev => ({ ...prev, budget: undefined }));
            }}
          />
          {errors.budget && <S.ErrorMessage>{errors.budget}</S.ErrorMessage>}
        </S.FormSection>

        <S.FormSection>
          <S.FormLabel>Imagem do Filme (opcional)</S.FormLabel>
          <S.ImageInputContainer>
            <Input
              type="url"
              placeholder="https://exemplo.com/imagem.jpg (opcional)"
              value={movieData.imageUrl.startsWith('data:') ? '' : movieData.imageUrl}
              onChange={(e) => {
                setMovieData(prev => ({ ...prev, imageUrl: e.target.value }));
                if (errors.imageUrl) setErrors(prev => ({ ...prev, imageUrl: undefined }));
                setImagePreview('');
              }}
            />
            <S.UploadButton>
              <S.FileInput
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <S.UploadLabel>
                📁 Upload
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
          {isSubmitting ? 'Adicionando...' : 'Adicionar Filme'}
        </Button>
      </S.DrawerActions>
    </>
  );
};

const AddMovieDrawer: React.FC<AddMovieDrawerProps> = ({ isOpen, onClose, onAddMovie }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Adicionar filme">
      <AddMovieDrawerContent onClose={onClose} onAddMovie={onAddMovie} />
    </Drawer>
  );
};

export default AddMovieDrawer;
