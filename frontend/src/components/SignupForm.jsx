/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from 'react-bootstrap/esm/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import setAuthDataInLocalStorage from '../utils/setAuthDataInLocalStorage';
import { usePostSignupDataMutation } from '../services/api/signupApi';
import { setAuthData } from '../services/slices/authDataSlice';
import getErrorTextI18n from '../utils/getErrorTextI18n';

const SignupForm = () => {
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
  const handleSubmit = async ({ confirmPassword, ...values }, { setErrors }) => {
    const res = await postSignupData(values);
    if (res.data) {
      const { data: authData } = res;
      setAuthDataInLocalStorage(authData);
      dispatch(setAuthData(authData));
      navigate('/', { replace: false });
    } else {
      const textPathI18n = getErrorTextI18n(res);
      if (textPathI18n === 'notUniq') {
        setErrors({ isNotUniq: true });
      } else {
        toast.error(t(textPathI18n));
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, errorsTexts.length.username)
        .max(20, errorsTexts.length.username)
        .required(errorsTexts.required),
      password: Yup.string()
        .min(6, errorsTexts.length.password)
        .required(errorsTexts.required),
      confirmPassword: Yup.string()
        .min(6, errorsTexts.length.password)
        .oneOf([Yup.ref('password'), null], errorsTexts.confirm)
        .required(errorsTexts.required),
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
          placeholder="Имя пользователя"
          id="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          className={classNames('form-control', { 'is-invalid': !!formik.errors.username || !!formik.errors.isNotUniq })}
        />
        <label htmlFor="username">Имя пользователя</label>
        {formik.errors.username && <div className="invalid-feedback">{formik.errors.username}</div>}
      </div>

      <div className="form-floating mb-3">
        <input
          name="password"
          autoComplete="password"
          required=""
          placeholder="Пароль"
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className={classNames('form-control', { 'is-invalid': !!formik.errors.password || !!formik.errors.isNotUniq })}
        />
        <label htmlFor="password">Пароль</label>
        {formik.errors.password && <div className="invalid-feedback">{formik.errors.password}</div>}
      </div>

      <div className="form-floating mb-4">
        <input
          name="confirmPassword"
          autoComplete="confirmPassword"
          required=""
          placeholder="Подтвердите пароль"
          type="password"
          id="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          className={classNames('form-control', { 'is-invalid': !!formik.errors.confirmPassword || !!formik.errors.isNotUniq })}
        />
        <label htmlFor="confirmPassword">Подтвердите пароль</label>
        {formik.errors.confirmPassword && <div className="invalid-feedback">{formik.errors.confirmPassword}</div>}
        {formik.errors.isNotUniq && <div className="invalid-tooltip" style={{ display: 'block' }}>{t('signup.form.errors.invalidRequest')}</div>}
      </div>
      <Button type="submit" className="w-100 mb-3" variant="outline-primary" disabled={formik.isSubmitting}>
        Войти
      </Button>
    </form>
  );
};

export default SignupForm;
