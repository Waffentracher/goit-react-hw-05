import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/api';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
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
            src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'path_to_placeholder_image'}
            alt={actor.name}
            className={styles.actorPhoto}
          />
          <p>{actor.name}</p>
          <p><strong>Character:</strong> {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
