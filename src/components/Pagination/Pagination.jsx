import React from 'react';
import css from './Pagination.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ moviesPerPage, totalMovies, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxVisibleButtons = 4;
  let visiblePageNumbers = pageNumbers;

  if (pageNumbers.length > maxVisibleButtons) {
    const startIndex =
      currentPage > maxVisibleButtons - 2
        ? currentPage - maxVisibleButtons + 2
        : 0;

    visiblePageNumbers = pageNumbers.slice(
      startIndex,
      startIndex + maxVisibleButtons - 2
    );
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

        {currentPage > maxVisibleButtons - 2 && (
          <li className={css.pageItem}>
            <button className={css.pageLink} disabled>
              ...
            </button>
          </li>
        )}

        {visiblePageNumbers.map(number => (
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

        {currentPage + maxVisibleButtons - 2 < pageNumbers.length && (
          <li className={css.pageItem}>
            <button className={css.pageLink} disabled>
              ...
            </button>
          </li>
        )}

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
