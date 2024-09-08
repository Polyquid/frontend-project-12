import * as Yup from 'yup';

const getSignUpSchema = ({ required, length: { username, password }, confirm }) => Yup.object({
  username: Yup.string()
    .min(3, username)
    .max(20, username)
    .required(required),
  password: Yup.string()
    .min(6, password)
    .required(required),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], confirm)
    .required(required),
});

export default getSignUpSchema;
