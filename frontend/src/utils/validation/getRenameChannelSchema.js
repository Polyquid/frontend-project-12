import * as Yup from 'yup';

const getRenameChannelSchema = (channelsNames, { required, length, uniq }) => Yup.object({
  name: Yup.string()
    .required(required)
    .min(3, length)
    .max(20, length)
    .notOneOf(channelsNames, uniq),
});

export default getRenameChannelSchema;
