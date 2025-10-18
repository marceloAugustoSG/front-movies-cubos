import React, { useState } from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Input from '../../components/Input';
import * as S from './styles';

interface MovieFilters {
  duration?: {
    min?: number;
    max?: number;
  };
  releaseDate?: {
    start?: string;
    end?: string;
  };
  genre?: string;
}

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: MovieFilters) => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState<MovieFilters>({});

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filtros">
      <S.ModalContent>
        {/* Filtro de Duração */}
        <S.FilterSection>
          <S.FilterLabel>Duração (minutos)</S.FilterLabel>
          <S.DurationInputs>
            <Input
              type="number"
              placeholder="Mínimo"
              value={filters.duration?.min || ''}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                duration: {
                  ...prev.duration,
                  min: e.target.value ? parseInt(e.target.value) : undefined
                }
              }))}
            />
            <S.DurationSeparator>até</S.DurationSeparator>
            <Input
              type="number"
              placeholder="Máximo"
              value={filters.duration?.max || ''}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                duration: {
                  ...prev.duration,
                  max: e.target.value ? parseInt(e.target.value) : undefined
                }
              }))}
            />
          </S.DurationInputs>
        </S.FilterSection>

        {/* Filtro de Data de Lançamento */}
        <S.FilterSection>
          <S.FilterLabel>Data de Lançamento</S.FilterLabel>
          <S.DateInputs>
            <Input
              type="date"
              placeholder="Data inicial"
              value={filters.releaseDate?.start || ''}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                releaseDate: {
                  ...prev.releaseDate,
                  start: e.target.value
                }
              }))}
            />
            <S.DateSeparator>até</S.DateSeparator>
            <Input
              type="date"
              placeholder="Data final"
              value={filters.releaseDate?.end || ''}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                releaseDate: {
                  ...prev.releaseDate,
                  end: e.target.value
                }
              }))}
            />
          </S.DateInputs>
        </S.FilterSection>

        {/* Filtro de Gênero */}
        <S.FilterSection>
          <S.FilterLabel>Gênero</S.FilterLabel>
          <S.GenreSelect
            value={filters.genre || ''}
            onChange={(e) => setFilters(prev => ({
              ...prev,
              genre: e.target.value || undefined
            }))}
          >
            <option value="">Selecione um gênero</option>
            <option value="Ação">Ação</option>
            <option value="Aventura">Aventura</option>
            <option value="Comédia">Comédia</option>
            <option value="Drama">Drama</option>
            <option value="Ficção Científica">Ficção Científica</option>
            <option value="Terror">Terror</option>
            <option value="Romance">Romance</option>
            <option value="Animação">Animação</option>
            <option value="Documentário">Documentário</option>
            <option value="Thriller">Thriller</option>
          </S.GenreSelect>
        </S.FilterSection>
      </S.ModalContent>

      <S.ModalActions>
        <Button variant="filter-toggle" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="add-movie" onClick={handleApply}>
          Aplicar Filtro
        </Button>
      </S.ModalActions>
    </Modal>
  );
};

export default FiltersModal;
