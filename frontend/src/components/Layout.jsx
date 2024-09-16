import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => (
  <div className="d-flex flex-column h-100">
    <Header />
    <Outlet />
  </div>
);

export default Layout;
