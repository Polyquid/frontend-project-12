import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SignUpForm from '../components/SignUpForm.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/signup', { replace: false });
  const handleKeyUp = (e) => {
    if (e.code === 'Enter') {
      navigate('/signup', { replace: false });
    }
  };
  const currentToken = localStorage.getItem('token');
  useEffect(() => {
    if (currentToken) {
      navigate('/', { replace: false });
    }
  }, [currentToken, navigate]);
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <SignUpForm />
            </div>
            <div className="card-footer p-4">
              <div className="d-flex flex-column align-items-center">
                <span className="mb-3">Нет аккаунта?</span>
                <button type="button" className="btn btn-outline-primary" onClick={handleClick} onKeyUp={handleKeyUp}>Регистрация</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
