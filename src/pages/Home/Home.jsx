import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTrendingMovies } from '../../api/Api';
import PropTypes from 'prop-types';
import css from './Home.module.css';
import noPoster from '../../img/noPoster.jpg';
import Pagination from 'components/Pagination/Pagination';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);

  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await getTrendingMovies();
        setMovies(movies);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 768 && width <= 1023) {
        setMoviesPerPage(8);
      } else if (width >= 320 && width <= 767) {
        setMoviesPerPage(6);
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
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (movies.length === 0) {
    return;
  }

  return (
    <>
      <div>
        <h2 className={css.text}>Trending films this week:</h2>
        <ul className={css.list}>
          <li>
            {currentMovies.map(({ id, title, poster_path }) => {
              return (
                <Link
                  key={id}
                  to={`movies/${id}`}
                  state={{ from: location }}
                  className={css.link}
                >
                  <li key={id} className={css.item}>
                    <img
                      className={css.img}
                      src={
                        poster_path
                          ? `https://image.tmdb.org/t/p/w500${poster_path}`
                          : noPoster
                      }
                      alt="Poster"
                      height="400"
                    />
                    <p className={css.itemName}>{title}</p>
                  </li>
                </Link>
              );
            })}
          </li>
        </ul>
        <Pagination
          moviesPerPage={moviesPerPage}
          totalMovies={movies.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </>
  );
};

Home.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default Home;
