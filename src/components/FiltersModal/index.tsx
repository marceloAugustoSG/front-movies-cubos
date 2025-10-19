import React, { useState } from 'react';
import Modal, { useModalContext } from '../../components/Modal';
import Button from '../../components/Button';
import Input from '../../components/Input';
import * as S from './styles';

export interface MovieFilters {
  title?: string;
  releaseYear?: number;
  releaseDateFrom?: string;
  releaseDateTo?: string;
  minDuration?: number;
  maxDuration?: number;
  minBudget?: number;
  maxBudget?: number;
  userId?: string;
  genre?: string;
}

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: MovieFilters) => void;
}

const FiltersModalContent: React.FC<Omit<FiltersModalProps, 'isOpen'>> = ({ onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState<MovieFilters>({});
  const [dateError, setDateError] = useState<string>('');
  const { onCloseWithAnimation } = useModalContext();

  const validateDates = (fromDate?: string, toDate?: string) => {
    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      setDateError('A data de início deve ser anterior à data de fim');
      return false;
    }
    setDateError('');
    return true;
  };

  const handleApply = () => {
    if (!validateDates(filters.releaseDateFrom, filters.releaseDateTo)) {
      return;
    }
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
          <S.FilterLabel>Gênero</S.FilterLabel>
          <Input
            type="text"
            placeholder="Ex: Ação, Comédia, Drama"
            value={filters.genre || ''}
            onChange={(e) => setFilters(prev => ({
              ...prev,
              genre: e.target.value || undefined
            }))}
          />
        </S.FilterSection>

        <S.FilterSection>
          <S.FilterLabel>Período de Lançamento</S.FilterLabel>
          <S.DurationInputs>
            <Input
              type="date"
              placeholder="Data de início"
              value={filters.releaseDateFrom || ''}
              onChange={(e) => {
                const newFromDate = e.target.value || undefined;
                setFilters(prev => ({
                  ...prev,
                  releaseDateFrom: newFromDate
                }));
                validateDates(newFromDate, filters.releaseDateTo);
              }}
            />
            <S.DurationSeparator>até</S.DurationSeparator>
            <Input
              type="date"
              placeholder="Data de fim"
              value={filters.releaseDateTo || ''}
              onChange={(e) => {
                const newToDate = e.target.value || undefined;
                setFilters(prev => ({
                  ...prev,
                  releaseDateTo: newToDate
                }));
                validateDates(filters.releaseDateFrom, newToDate);
              }}
            />
          </S.DurationInputs>
          {dateError && <span style={{color: '#ff4444', fontSize: '12px', marginTop: '4px'}}>{dateError}</span>}
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
        <Button variant="modal-cancel" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="modal-apply" onClick={handleApply}>
          Aplicar Filtros
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
