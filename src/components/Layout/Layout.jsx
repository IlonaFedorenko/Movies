import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from '../AppBar/AppBar';

const Layout = () => {
  return (
    <main>
      <AppBar />
      <Suspense>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default Layout;
