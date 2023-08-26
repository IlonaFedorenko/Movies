import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCreditsMovies } from '../../../api/Api';
import noPoster from '../../../img/noPoster.jpg';
import PropTypes from 'prop-types';
import css from './Cast.module.css';
import Pagination from '../../../components/Pagination/Pagination';

function Cast() {
  const { moviesId } = useParams();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { cast } = await getCreditsMovies(moviesId);
        setMovies(cast);
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
  const currentCast = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (movies.length === 0) {
    return;
  }

  return (
    <>
      <div>
        <div className={css.box}>
          {currentCast.map(
            ({ cast_id, original_name, character, profile_path }) => {
              return (
                <div key={cast_id} className={css.list}>
                  <div className={css.div}>
                    <img
                      className={css.img}
                      src={
                        profile_path
                          ? `https://image.tmdb.org/t/p/w500${profile_path}`
                          : noPoster
                      }
                      alt="character"
                      width="150"
                      
                    />
                    <div className={css.textWrap}>
                      <h3 className={css.title}>{original_name}</h3>
                      <p className={css.item}>Character: {character}</p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
        <Pagination
          moviesPerPage={moviesPerPage}
          totalMovies={movies.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </>
  );
}

Cast.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      cast_id: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
      original_name: PropTypes.string.isRequired,
      profile_path: PropTypes.string.isRequired,
    })
  ),
};

export default Cast;
