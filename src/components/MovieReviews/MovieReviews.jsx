// components/MovieReviews.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  return (
    <ul className={styles.reviewsList}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <li key={review.id} className={styles.reviewItem}>
            <h3 className={styles.author}>{review.author}</h3>
            <p className={styles.content}>{review.content}</p>
          </li>
        ))
      ) : (
        <li className={styles.noReviews}>No reviews available</li>
      )}
    </ul>
  );
};

export default MovieReviews;
