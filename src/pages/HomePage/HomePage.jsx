import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Trending Movies</h1>
      <div className={styles.movieList}>
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default HomePage;
