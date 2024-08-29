import {
  createBrowserRouter,
} from 'react-router-dom';
import Header from '../components/Header.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Header />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
]);

export default router;
