import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const movieReviews = await fetchMovieReviews(movieId);
        setReviews(movieReviews);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <ul className={styles.reviewsList}>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map((review) => (
          <li key={review.id} className={styles.reviewItem}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))
      )}
    </ul>
  );
};

MovieReviews.propTypes = {
  movieId: PropTypes.string.isRequired, 
};

export default MovieReviews;
