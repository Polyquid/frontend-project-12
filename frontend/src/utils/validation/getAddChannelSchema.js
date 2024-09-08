import * as Yup from 'yup';

const getAddChannelSchema = (channelsNames) => Yup.object({
  name: Yup.string()
    .required('Обязательно для заполнения')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .notOneOf(channelsNames, 'Должно быть уникальным'),
});

export default getAddChannelSchema;
