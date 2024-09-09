const getErrorTextI18n = ({ error }) => {
  switch (error.status) {
    case 401:
      return 'invalidData';
    case 409:
      return 'notUniq';
    case 'FETCH_ERROR':
      return 'chat.notifications.errors.network';
    case 'PARSING_ERROR':
      return 'chat.notifications.errors.parsing';
    default:
      return 'chat.notifications.errors.unknown';
  }
};

export default getErrorTextI18n;
