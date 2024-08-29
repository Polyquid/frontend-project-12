/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';

const Form = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form className="col-12 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input
          type="text"
          name="username"
          autoComplete="username"
          required=""
          placeholder="Ваш ник"
          id="username"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="current-password"
          required=""
          placeholder="Пароль"
          type="password"
          id="password"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label htmlFor="password">Пароль</label>
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
        Войти
      </button>
    </form>
  );
};

export default Form;
