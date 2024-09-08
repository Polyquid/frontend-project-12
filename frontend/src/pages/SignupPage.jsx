import Header from '../components/Header';
import SignupForm from '../components/SignupForm';

const SignupPage = () => (
  <div className="d-flex flex-column h-100">
    <Header />
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <h1 className="text-center mb-4">Регистрация</h1>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SignupPage;
