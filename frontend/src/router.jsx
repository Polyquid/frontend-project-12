import {
  createBrowserRouter,
} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import PrivateRoute from './pages/PrivateRoute.jsx';
import Layout from './pages/Layout.jsx';
import Chat from './components/Chat.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
    children: [
      {
        path: '',
        element: (
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
    ],
  },
]);

export default router;
