import {
  createBrowserRouter,
} from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import App from '../components/App.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
]);

export default router;
