import React from 'react';
import css from './Pagination.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ moviesPerPage, totalMovies, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={css.pagination}>
        <li className={css.pageItem}>
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`${css.pageLink} ${css.prevNextLink} ${css.prevButton}`}
            disabled={currentPage === 1}
          >
            <span className={css.iconWrapper}>
              <FaChevronLeft className={css.arrowIcon} />
            </span>
          </button>
        </li>

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

        <li className={css.pageItem}>
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`${css.pageLink} ${css.prevNextLink} ${css.nextButton}`}
            disabled={currentPage === pageNumbers.length}
          >
            <span className={css.iconWrapper}>
              <FaChevronRight className={css.arrowIcon} />
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
