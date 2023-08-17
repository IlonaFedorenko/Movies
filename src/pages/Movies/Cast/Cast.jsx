import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCreditsMovies } from '../../../api/Api';
import noPoster from '../../../img/noPoster.jpg';
import PropTypes from 'prop-types';

function Cast() {
  const { moviesId } = useParams();
  const [movies, setMovies] = useState([]);

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

  if (movies.length === 0) {
    return;
  }

  return (
    <>
      <div>
        <ul>
          {movies.map(({ cast_id, original_name, character, profile_path }) => {
            return (
              <li key={cast_id}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : noPoster
                  }
                  alt="character"
                  width="150"
                />
                <h3>{original_name}</h3>
                <p>Character: {character}</p>
              </li>
            );
          })}
        </ul>
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
