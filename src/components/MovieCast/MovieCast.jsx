import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieCast } from '../../services/api';
import styles from './MovieCast.module.css';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const movieCast = await fetchMovieCast(movieId);
        setCast(movieCast);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <ul className={styles.castList}>
      {cast.map((actor) => (
        <li key={actor.id} className={styles.castItem}>
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt={actor.name}
            className={styles.actorPhoto}
          />
          <p>{actor.name}</p>
        </li>
      ))}
    </ul>
  );
};

MovieCast.propTypes = {
  movieId: PropTypes.string.isRequired, 
};

export default MovieCast;
