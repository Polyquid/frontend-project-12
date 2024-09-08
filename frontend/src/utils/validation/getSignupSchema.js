import * as Yup from 'yup';

const getSignUpSchema = () => Yup.object({
  username: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательно для заполнения'),
  password: Yup.string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательно для заполнения'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Обязательно для заполнения'),
});

export default getSignUpSchema;
