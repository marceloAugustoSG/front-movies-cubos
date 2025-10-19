import React from 'react';
import * as S from './styles';

interface InfoBlockProps {
  title: string;
  value: string | React.ReactNode;
  children?: React.ReactNode;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ title, value, children }) => {
  return (
    <S.InfoBlockContainer>
      <S.InfoBlockTitle>{title}</S.InfoBlockTitle>
      <S.InfoBlockValue>{value}</S.InfoBlockValue>
      {children}
    </S.InfoBlockContainer>
  );
};

export default InfoBlock;
