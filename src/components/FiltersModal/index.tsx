import React, { useState } from 'react';
import Modal, { useModalContext } from '../../components/Modal';
import Button from '../../components/Button';
import Input from '../../components/Input';
import * as S from './styles';

interface MovieFilters {
  title?: string;
  releaseYear?: number;
  minDuration?: number;
  maxDuration?: number;
  minBudget?: number;
  maxBudget?: number;
}

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: MovieFilters) => void;
}

const FiltersModalContent: React.FC<Omit<FiltersModalProps, 'isOpen'>> = ({ onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState<MovieFilters>({});
  const { onCloseWithAnimation } = useModalContext();

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleCancel = () => {
    onCloseWithAnimation();
  };

  return (
    <>
      <S.ModalContent>
        <S.FilterSection>
          <S.FilterLabel>Título do Filme</S.FilterLabel>
          <Input
            type="text"
            placeholder="Digite o título do filme"
            value={filters.title || ''}
            onChange={(e) => setFilters(prev => ({
              ...prev,
              title: e.target.value || undefined
            }))}
          />
        </S.FilterSection>

        <S.FilterSection>
          <S.FilterLabel>Ano de Lançamento</S.FilterLabel>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Ex: 2023"
            min="1900"
            max="2030"
            value={filters.releaseYear !== undefined ? String(filters.releaseYear) : ''}
            onChange={(e) => setFilters(prev => ({
              ...prev,
              releaseYear: e.target.value ? parseInt(e.target.value) : undefined
            }))}
          />
        </S.FilterSection>

        <S.FilterSection>
          <S.FilterLabel>Duração (minutos)</S.FilterLabel>
          <S.DurationInputs>
            <Input
              type="number"
              placeholder="Mínimo"
              min="1"
              value={filters.minDuration !== undefined ? String(filters.minDuration) : ''}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                minDuration: e.target.value ? parseInt(e.target.value) : undefined
              }))}
            />
            <S.DurationSeparator>até</S.DurationSeparator>
            <Input
              type="number"
              placeholder="Máximo"
              min="1"
              value={filters.maxDuration !== undefined ? String(filters.maxDuration) : ''}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                maxDuration: e.target.value ? parseInt(e.target.value) : undefined
              }))}
            />
          </S.DurationInputs>
        </S.FilterSection>

        <S.FilterSection>
          <S.FilterLabel>Orçamento (USD)</S.FilterLabel>
          <S.DurationInputs>
            <Input
              type="number"
              placeholder="Mínimo"
              min="0"
              value={filters.minBudget !== undefined ? String(filters.minBudget) : ''}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                minBudget: e.target.value ? parseInt(e.target.value) : undefined
              }))}
            />
            <S.DurationSeparator>até</S.DurationSeparator>
            <Input
              type="number"
              placeholder="Máximo"
              min="0"
              value={filters.maxBudget !== undefined ? String(filters.maxBudget) : ''}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                maxBudget: e.target.value ? parseInt(e.target.value) : undefined
              }))}
            />
          </S.DurationInputs>
        </S.FilterSection>
      </S.ModalContent>

      <S.ModalActions>
        <Button variant="filter-toggle" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="add-movie" onClick={handleApply}>
          Aplicar Filtro
        </Button>
      </S.ModalActions>
    </>
  );
};

const FiltersModal: React.FC<FiltersModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filtros">
      <FiltersModalContent onClose={onClose} onApplyFilters={onApplyFilters} />
    </Modal>
  );
};

export default FiltersModal;
