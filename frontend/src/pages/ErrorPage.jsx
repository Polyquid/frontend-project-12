import { useRouteError, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const handleClick = () => navigate('/', { replace: false });
  const handleKeyUp = (e) => {
    if (e.code === 'Enter') {
      navigate('/', { replace: false });
    }
  };
  console.error(error);
  return (
    <div className="position-absolute top-50 start-50 translate-middle text-center">
      <h1>Oops!</h1>
      <p className="h4 text-muted">
        <i>{error.statusText || error.message}</i>
      </p>
      <p className="text-muted d-flex flex-column align-items-center">
        {'Страница не найдена '}
        <button type="button" className="btn btn-outline-primary" onClick={handleClick} onKeyUp={handleKeyUp}>Перейти на главную страницу</button>
      </p>
    </div>
  );
};

export default ErrorPage;
