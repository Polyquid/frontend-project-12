/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import getSignUpSchema from '../utils/getSignUpSchema';
import setAuthDataInLocalStorage from '../utils/setAuthDataInLocalStorage';
import { setAuthToken, setUserName } from '../services/authSlice';

const SignUpForm = () => {
  const [isInvalidResponse, setIsInvalidResponse] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signUpSchema = getSignUpSchema();
  const handleSubmit = async (values) => {
    try {
      const { data: { token, username } } = await axios.post('/api/v1/login', values);
      setAuthDataInLocalStorage(token, username);
      dispatch(setAuthToken({ token }));
      dispatch(setUserName({ username }));
      setIsInvalidResponse(false);
      navigate('/', { replace: false });
    } catch (e) {
      setIsInvalidResponse(true);
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <h1 className="text-center mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <Field
              type="text"
              name="username"
              autoComplete="username"
              required=""
              placeholder="Ваш ник"
              id="username"
              className={`form-control ${
                (touched.username && errors.username) || isInvalidResponse ? 'is-invalid' : ''
              }`}
            />
            <label htmlFor="username">Ваш ник</label>
            <ErrorMessage
              component="div"
              name="username"
              className="invalid-feedback"
            />
          </div>
          <div className="form-floating mb-4">
            <Field
              name="password"
              autoComplete="current-password"
              required=""
              placeholder="Пароль"
              type="password"
              id="password"
              className={`form-control ${
                (touched.password && errors.password) || isInvalidResponse ? 'is-invalid' : ''
              }`}
            />
            <label htmlFor="password">Пароль</label>
            <ErrorMessage
              component="div"
              name="password"
              className="invalid-feedback"
            />
            {isInvalidResponse ? <div className="invalid-tooltip" style={{ display: 'block' }}>Неверные имя пользователя или пароль</div> : null}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
            Войти
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
