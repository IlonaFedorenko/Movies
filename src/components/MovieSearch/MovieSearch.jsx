import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { searchMovies } from '../../api/Api';
import PropTypes from 'prop-types';

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSerchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const [query, setQuery] = useState(() => searchQuery || '');

  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { results } = await searchMovies(searchQuery);
        setMovies(results);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchQuery) {
      getMovies();
    }
  }, [searchQuery]);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handelSubmit = e => {
    e.preventDefault();
    setSerchParams({ query: query });
    setQuery('');
  };

  return (
    <>
      <form onSubmit={handelSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="search"
          value={query}
          placeholder="Search movie"
          autoComplete="off"
          autoFocus
        ></input>
        <button type="submit">
          <span>Search</span>
        </button>
      </form>

      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={`${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

MovieSearch.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

export default MovieSearch;
