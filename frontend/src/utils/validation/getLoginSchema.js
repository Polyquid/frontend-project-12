import * as Yup from 'yup';

const getLoginSchema = ({ required }) => Yup.object({
  username: Yup.string()
    .required(required),
  password: Yup.string()
    .required(required),
});

export default getLoginSchema;
