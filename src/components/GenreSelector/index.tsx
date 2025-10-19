import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import * as S from './styles';

interface GenreSelectorProps {
  genres: string[];
  onChange: (genres: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({
  genres,
  onChange,
  placeholder = "Digite um gênero",
  disabled = false
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddGenre = () => {
    const genre = inputValue.trim();
    if (genre && !genres.includes(genre)) {
      onChange([...genres, genre]);
      setInputValue('');
    }
  };

  const handleRemoveGenre = (genreToRemove: string) => {
    onChange(genres.filter(genre => genre !== genreToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddGenre();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <S.Container>
      <S.Label>Gêneros</S.Label>
      
      <S.InputContainer>
        <S.Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
        />
        <S.AddButton
          type="button"
          onClick={handleAddGenre}
          disabled={disabled || !inputValue.trim() || genres.includes(inputValue.trim())}
        >
          <Plus size={16} />
        </S.AddButton>
      </S.InputContainer>

      {genres.length > 0 && (
        <S.GenresContainer>
          {genres.map((genre, index) => (
            <S.GenreTag key={index}>
              <S.GenreText>{genre}</S.GenreText>
              <S.RemoveButton
                type="button"
                onClick={() => handleRemoveGenre(genre)}
                disabled={disabled}
              >
                <X size={12} />
              </S.RemoveButton>
            </S.GenreTag>
          ))}
        </S.GenresContainer>
      )}

      {genres.length === 0 && (
        <S.EmptyMessage>Nenhum gênero adicionado</S.EmptyMessage>
      )}
    </S.Container>
  );
};

export default GenreSelector;
