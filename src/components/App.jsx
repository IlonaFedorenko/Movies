import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home/Home'));
const MovieSearch = lazy(() => import('../components/MovieSearch/MovieSearch'));
const MovieDetails = lazy(() =>
  import('../pages/Movies/MovieDetails/MovieDetails')
);
const Cast = lazy(() => import('../pages/Movies/Cast/Cast'));
const Reviews = lazy(() => import('../pages/Movies/Reviews/Review'));
const Layout = lazy(() => import('../components/Layout/Layout'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/movies" element={<MovieSearch />} />
        <Route path="/movies/:moviesId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};
