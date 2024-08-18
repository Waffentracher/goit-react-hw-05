import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import { fetchMoviesByQuery } from '../../services/api';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const queryFromUrl = queryParams.get('query') || '';
  
  useEffect(() => {
    const fetchMovies = async () => {
      if (queryFromUrl) {
        try {
          const movies = await fetchMoviesByQuery(queryFromUrl);
          setMovies(movies);
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      }
    };

    fetchMovies();
  }, [queryFromUrl]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/movies?query=${query.trim()}`);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
