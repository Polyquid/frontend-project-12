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
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import setAuthDataInLocalStorage from '../utils/setAuthDataInLocalStorage';
import { usePostSignupDataMutation } from '../services/signupApi';
import { setAuthData } from '../services/authDataSlice';
import getErrorTextI18n from '../utils/getErrorTextI18n';

const SignupForm = () => {
  const [isNotUniq, setIsNotUniq] = useState(false);
  const [disabled, setDisabled] = useState(null);
  const [postSignupData] = usePostSignupDataMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const errorsTexts = {
    required: t('signup.form.errors.required'),
    confirm: t('signup.form.errors.confirmPassword'),
    length: {
      username: t('signup.form.errors.usernameLength'),
      password: t('signup.form.errors.passwordLength'),
    },
  };
  const handleSubmit = async ({ confirmPassword, ...values }) => {
    setDisabled('on');
    const res = await postSignupData(values);
    if (res.data) {
      const { data: authData } = res;
      setAuthDataInLocalStorage(authData);
      setIsNotUniq(false);
      dispatch(setAuthData(authData));
      navigate('/', { replace: false });
      setDisabled(null);
    } else {
      const textPathI18n = getErrorTextI18n(res);
      if (textPathI18n === 'notUniq') {
        setIsNotUniq(true);
      } else {
        toast.error(t(textPathI18n));
      }
      setDisabled(null);
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={
        Yup.object({
          username: Yup.string()
            .min(3, errorsTexts.username)
            .max(20, errorsTexts.username)
            .required(errorsTexts.required),
          password: Yup.string()
            .min(6, errorsTexts.password)
            .required(errorsTexts.required),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], errorsTexts.confirm)
            .required(errorsTexts.required),
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
              placeholder="Имя пользователя"
              id="username"
              className={`form-control ${
                (touched.username && errors.username) || isNotUniq ? 'is-invalid' : ''
              }`}
            />
            <label htmlFor="username">Имя пользователя</label>
            <ErrorMessage
              component="div"
              name="username"
              className="invalid-feedback"
            />
          </div>

          <div className="form-floating mb-3">
            <Field
              name="password"
              autoComplete="password"
              required=""
              placeholder="Пароль"
              type="password"
              id="password"
              className={`form-control ${
                (touched.password && errors.password) || isNotUniq ? 'is-invalid' : ''
              }`}
            />
            <label htmlFor="password">Пароль</label>
            <ErrorMessage
              component="div"
              name="password"
              className="invalid-feedback"
            />
          </div>

          <div className="form-floating mb-4">
            <Field
              name="confirmPassword"
              autoComplete="confirmPassword"
              required=""
              placeholder="Подтвердите пароль"
              type="password"
              id="confirmPassword"
              className={`form-control ${
                (touched.confirmPassword && errors.confirmPassword) || isNotUniq ? 'is-invalid' : ''
              }`}
            />
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <ErrorMessage
              component="div"
              name="confirmPassword"
              className="invalid-feedback"
            />
            {isNotUniq ? <div className="invalid-tooltip" style={{ display: 'block' }}>{t('signup.form.errors.invalidRequest')}</div> : null}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={disabled}>
            Войти
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
