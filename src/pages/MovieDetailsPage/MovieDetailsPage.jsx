import { useEffect, useState } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className={styles.movieDetails}>
      <Link to="/" className={styles.goBack}>Go back</Link>
      <h2 className={styles.title}>{movie.title}</h2>
      <p className={styles.overview}>{movie.overview}</p>
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
        className={styles.poster}
      />
      <div className={styles.additionalInfo}>
        <Link to={`/movies/${movieId}/cast`} className={styles.link}>Cast</Link>
        <Link to={`/movies/${movieId}/reviews`} className={styles.link}>Reviews</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
