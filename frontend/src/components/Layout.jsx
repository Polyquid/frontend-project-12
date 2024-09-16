import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = ({ children }) => (
  <div className="d-flex flex-column h-100">
    <Header />
    {children ?? <Outlet />}
  </div>
);

export default Layout;
