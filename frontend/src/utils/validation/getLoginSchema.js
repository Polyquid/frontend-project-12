import * as Yup from 'yup';

const getLoginSchema = () => Yup.object({
  username: Yup.string()
    .required('Обязательно для заполнения'),
  password: Yup.string()
    .required('Обязательно для заполнения'),
});

export default getLoginSchema;
