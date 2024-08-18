import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/api';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchDetails();
  }, [movieId]);

  const handleShowCast = () => {
    setShowCast(true);
    setShowReviews(false);
    navigate(`/movies/${movieId}/cast`);
  };

  const handleShowReviews = () => {
    setShowCast(false);
    setShowReviews(true);
    navigate(`/movies/${movieId}/reviews`);
  };

  if (!movie) return null;

  return (
    <div className={styles.container}>
      <Link to="/">Go back</Link>
      <div className={styles.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.details}>
          <h2>{movie.title}</h2>
          <p><strong>User Score:</strong> {movie.vote_average * 10}%</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
          <p><strong>Overview:</strong> {movie.overview}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <button 
          onClick={handleShowCast} 
          className={`${styles.button} ${showCast ? styles.active : ''}`}>
          Show Cast
        </button>
        <button 
          onClick={handleShowReviews} 
          className={`${styles.button} ${showReviews ? styles.active : ''}`}>
          Show Reviews
        </button>
      </div>
      {showCast && <MovieCast movieId={movieId} />}
      {showReviews && <MovieReviews movieId={movieId} />}
    </div>
  );
};

export default MovieDetailsPage;
