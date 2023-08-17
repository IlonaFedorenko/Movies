import { Header, NavItem } from './AppBar.module.js';
import { IoIosSearch } from 'react-icons/io';
import { GiFilmSpool } from 'react-icons/gi';
import css from './AppBar.module.css';

const navItem = [
  { href: '', text: 'TrendMovies' },
  { href: 'movies', text: 'SearchMovies' },
];

export const AppBar = () => {
  return (
    <Header>
      {navItem.map(({ href, text }) => (
        <NavItem to={href} key={text}>
          {text === 'TrendMovies' ? (
            <GiFilmSpool size={20} className={css.svg} />
          ) : (
            <IoIosSearch size={20} className={css.svg} />
          )}
          {text}
        </NavItem>
      ))}
    </Header>
  );
};
