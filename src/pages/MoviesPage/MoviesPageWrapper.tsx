import React, { useState, useEffect } from 'react';
import MoviesPage from './index';
import Layout from '../../components/Layout';

const MoviesPageWrapper: React.FC = () => {
  const [hasMovies, setHasMovies] = useState(true);

  useEffect(() => {
    const checkMovies = () => {
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
