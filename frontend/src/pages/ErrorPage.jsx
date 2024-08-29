import { useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="position-absolute top-50 start-50 translate-middle text-center">
      <h1>Oops!</h1>
      <p className="h4 text-muted">
        <i>{error.statusText || error.message}</i>
      </p>
      <p className="text-muted">
        {'Страница не найдена. Но вы можете перейти на '}
        <Link to="/">главную страницу</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
