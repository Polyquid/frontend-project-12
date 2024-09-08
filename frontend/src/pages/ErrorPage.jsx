import { useRouteError, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/esm/Button';
import Header from '../components/Header';

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const { t } = useTranslation();

  const handleClick = () => navigate('/', { replace: false });
  const handleKeyUp = (e) => {
    if (e.code === 'Enter') {
      navigate('/', { replace: false });
    }
  };

  return (
    <div className="col p-0 h-100">
      <Header />
      <div className="position-absolute top-50 start-50 translate-middle text-center">
        <h1>{t('errorPage.title')}</h1>
        <p className="h4 text-muted">
          <i>{error.statusText || error.message}</i>
        </p>
        <p className="text-muted d-flex flex-column align-items-center">
          {t('errorPage.notFound')}
        </p>
        <div>
          {t('errorPage.goMain.text')}
          <Button type="button" size="sm" variant="outline-primary" onClick={handleClick} onKeyUp={handleKeyUp}>{t('errorPage.goMain.link')}</Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
