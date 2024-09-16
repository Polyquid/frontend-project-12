import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="col p-0 h-100">
      <div className="position-absolute top-50 start-50 translate-middle text-center">
        <h1>{t('errorPage.title')}</h1>
        <p className="text-muted d-flex flex-column align-items-center">
          {t('errorPage.notFound')}
        </p>
        <div>
          {t('errorPage.goMain.text')}
          <Link to="/">{t('errorPage.goMain.link')}</Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
