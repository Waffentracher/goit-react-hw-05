import { useState } from 'react';
import { fetchMoviesByQuery } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = () => {
    fetchMoviesByQuery(query).then(setMovies);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.search}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <MovieList movies={movies} />
      </div>
      <div className={styles.content}>
        {/* Additional content or search results can go here */}
      </div>
    </div>
  );
};

export default MoviesPage;
