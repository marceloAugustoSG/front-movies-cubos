import React, { useState, useEffect } from 'react';
import MoviesPage from './index';
import Layout from '../../components/Layout';

const MoviesPageWrapper: React.FC = () => {
  const [hasMovies, setHasMovies] = useState(true);

  useEffect(() => {
    // Detectar se há filmes baseado no estado da página
    // Por enquanto sempre true, mas pode ser conectado ao contexto de filmes
    const checkMovies = () => {
      // Simular verificação - em implementação real, isso viria do contexto ou API
      setHasMovies(true);
    };
    
    checkMovies();
  }, []);

  return (
    <Layout fixedFooter={!hasMovies}>
      <MoviesPage />
    </Layout>
  );
};

export default MoviesPageWrapper;
