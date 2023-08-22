import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsMovies } from '../../../api/Api';
import PropTypes from 'prop-types';
import css from './Review.module.css';
import Pagination from '../../../components/Pagination/Pagination';

function Reviews() {
  const { moviesId } = useParams();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);

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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 768 && width <= 1023) {
        setMoviesPerPage(8);
      } else if (width >= 320 && width <= 767) {
        setMoviesPerPage(5);
      } else {
        setMoviesPerPage(10);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentReview = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (movies.length === 0) {
    return <p>We don't have reviews for this movie.</p>;
  }

  return (
    <div>
      <ul>
        {currentReview.map(({ id, author, content }) => {
          return (
            <li key={id} className={css.list}>
              <h2 className={css.title}>{author}</h2>
              <p className={css.item}>{content}</p>
            </li>
          );
        })}
      </ul>
      <Pagination
        moviesPerPage={moviesPerPage}
        totalMovies={movies.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
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
