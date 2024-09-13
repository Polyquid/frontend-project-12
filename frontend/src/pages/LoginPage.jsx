import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/LoginForm.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => navigate('/signup', { replace: false });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <h1 className="text-center mb-4">{t('login.title')}</h1>
              <LoginForm />
            </div>
            <div className="card-footer p-4">
              <div className="d-flex flex-column align-items-center">
                <span className="mb-3">{t('login.noAccount')}</span>
                <button type="button" className="btn btn-outline-primary" onClick={handleClick}>{t('login.signupLink')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
