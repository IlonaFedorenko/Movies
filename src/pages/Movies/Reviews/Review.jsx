import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsMovies } from '../../../api/Api';
import PropTypes from 'prop-types';

function Reviews() {
  const { moviesId } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { results } = await getReviewsMovies(moviesId);
        setMovies(results);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, [moviesId]);

  if (movies.length === 0) {
    return <p>We don't have reviews for this movie.</p>;
  }

    return (
      <>
        <ul>
          {movies.map(({ id, author, content }) => {
            return (
              <li key={id}>
                <h2>{author}</h2>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      </>
    );
}

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

export default Reviews;
