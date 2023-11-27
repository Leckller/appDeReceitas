import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <div>
      <Header />
      <div className="w-screen h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
