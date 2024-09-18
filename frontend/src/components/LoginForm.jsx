/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from 'react-bootstrap/esm/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import setAuthDataInLocalStorage from '../utils/setAuthDataInLocalStorage';
import { usePostAuthDataMutation } from '../store/api/authApi';
import getErrorTextI18n from '../utils/getErrorTextI18n';
import { setAuthData } from '../store/slices/authDataSlice';

const LoginForm = () => {
  const [postAuthData] = usePostAuthDataMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const requiredTextError = t('login.form.errors.required');
  const handleSubmit = async (values, { setErrors }) => {
    const res = await postAuthData(values);
    if (res.data) {
      const { data: authData } = res;
      setAuthDataInLocalStorage(authData);
      dispatch(setAuthData(authData));
      navigate('/', { replace: false });
    } else {
      const textPathI18n = getErrorTextI18n(res);
      if (textPathI18n === 'invalidData') {
        setErrors({ unathorized: true });
      } else {
        toast.error(t(textPathI18n));
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .required(requiredTextError),
      password: Yup.string()
        .trim()
        .required(requiredTextError),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-floating mb-3">
        <input
          type="text"
          name="username"
          autoComplete="username"
          required=""
          placeholder="Ваш ник"
          id="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          className={classNames('form-control', { 'is-invalid': !!formik.errors.username || !!formik.errors.unathorized })}
        />
        <label htmlFor="username">Ваш ник</label>
        {formik.errors.username && <div className="invalid-feedback">{formik.errors.username}</div>}
      </div>
      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="password"
          required=""
          placeholder="Пароль"
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className={classNames('form-control', { 'is-invalid': !!formik.errors.password || !!formik.errors.unathorized })}
        />
        <label htmlFor="password">Пароль</label>
        {formik.errors.password && <div className="invalid-feedback">{formik.errors.password}</div>}
        {formik.errors.unathorized && <div className="invalid-tooltip" style={{ display: 'block' }}>{t('login.form.errors.invalidRequest')}</div>}
      </div>
      <Button type="submit" className="w-100 mb-3" variant="outline-primary" disabled={formik.isSubmitting}>
        Войти
      </Button>
    </form>
  );
};

export default LoginForm;
