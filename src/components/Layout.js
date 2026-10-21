import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => (
  <div>
    <NavBar />
    <div className="content">
      <Outlet />
    </div>
  </div>
);

export default Layout;