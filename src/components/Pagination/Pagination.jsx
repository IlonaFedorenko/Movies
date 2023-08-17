import React from 'react';
import css from './Pagination.module.css';

const Pagination = ({ moviesPerPage, totalMovies, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={css.pagination}>
        {pageNumbers.map(number => (
          <li key={number} className={css.pageItem}>
            <button
              onClick={() => paginate(number)}
              className={
                currentPage === number ? css.currentPage : css.pageLink
              }
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
