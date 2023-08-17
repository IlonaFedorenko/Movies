import React, { useState, useEffect, Suspense } from 'react';
import {
  useParams,
  NavLink,
  Link,
  useLocation,
  Outlet,
} from 'react-router-dom';
import { getDetailsMovies } from '../../../api/Api';
import PropTypes from 'prop-types';
import noPoster from '../../../img/noPoster.jpg';
import css from './MovieDetails.module.css';

function MovieDetails() {
  const { moviesId } = useParams();
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await getDetailsMovies(moviesId);
        setMovies(movies);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, [moviesId]);

  if (movies.length === 0) {
    return;
  }

  const { title, overview, genres, poster_path, vote_average } = movies;
  const userScoreNormalized = (vote_average * 10).toFixed();
  
  console.log(movies.poster_path);

  const genresPars = genres.map(({ name, id }) => {
    const gens = `${name} `;
    return gens;
  });

  return (
    <>
      <Link className={css.link} to={location.state?.from ?? '/movie'}>
        Back
      </Link>
      <div className={css.card}>
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
        <div className={css.box}>
          <ul className={css.list}>
            <li className={css.item}>
              <h1 className={css.title}>{title}:</h1>
              <p className={css.text_element}>
                User Score: {userScoreNormalized + '%'}{' '}
              </p>
            </li>
            <li className={css.item}>
              <h2 className={css.text}>Overview</h2>
              <p className={css.text_element}> {overview}</p>
            </li>
            <li className={css.item}>
              <h2 className={css.text}>Genres</h2>
              <p className={css.text_element}>{genresPars}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className={css.card_inform}>
        <h3>Additional iformation</h3>
        <ul>
          <li>
            <NavLink to="cast" state={{ from: location.state?.from }}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={{ from: location.state?.from }}>
              Reviews
            </NavLink>
          </li>
        </ul>

        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}

MovieDetails.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      vote_average: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(
        PropTypes.exact({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
    })
  ),
};

export default MovieDetails;
