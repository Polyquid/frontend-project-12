/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import setAuthDataInLocalStorage from '../utils/setAuthDataInLocalStorage';
import { usePostAuthDataMutation } from '../services/authApi';
import getErrorTextI18n from '../utils/getErrorTextI18n';
import { setAuthData } from '../services/authDataSlice';

const LoginForm = () => {
  const [isInvalidData, setIsInvalidData] = useState(false);
  const [disabled, setDisabled] = useState(null);
  const [postAuthData] = usePostAuthDataMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const requiredTextError = t('login.form.errors.required');
  const handleSubmit = async (values) => {
    setDisabled(true);
    const res = await postAuthData(values);
    if (res.data) {
      const { data: authData } = res;
      setAuthDataInLocalStorage(authData);
      dispatch(setAuthData(authData));
      setIsInvalidData(false);
      navigate('/', { replace: false });
      setDisabled(null);
    } else {
      const textPathI18n = getErrorTextI18n(res);
      if (textPathI18n === 'invalidData') {
        setIsInvalidData(true);
        setDisabled(null);
      } else {
        toast.error(t(textPathI18n));
        setDisabled(null);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={
        Yup.object({
          username: Yup.string()
            .required(requiredTextError),
          password: Yup.string()
            .required(requiredTextError),
        })
      }
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="form-floating mb-3">
            <Field
              type="text"
              name="username"
              autoComplete="username"
              required=""
              placeholder="Ваш ник"
              id="username"
              className={`form-control ${
                (touched.username && errors.username) || isInvalidData ? 'is-invalid' : ''
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
              autoComplete="password"
              required=""
              placeholder="Пароль"
              type="password"
              id="password"
              className={`form-control ${
                (touched.password && errors.password) || isInvalidData ? 'is-invalid' : ''
              }`}
            />
            <label htmlFor="password">Пароль</label>
            <ErrorMessage
              component="div"
              name="password"
              className="invalid-feedback"
            />
            {isInvalidData ? <div className="invalid-tooltip" style={{ display: 'block' }}>{t('login.form.errors.invalidRequest')}</div> : null}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={disabled}>
            Войти
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
