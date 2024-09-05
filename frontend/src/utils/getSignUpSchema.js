import * as Yup from 'yup';

const getSignUpSchema = () => Yup.object({
  username: Yup.string()
    .required('Обязательно для заполнения'),
  password: Yup.string()
    .required('Обязательно для заполнения'),
});

export default getSignUpSchema;
