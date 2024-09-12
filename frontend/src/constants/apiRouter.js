const API_ROUTER = {
  MESSAGES: '/api/v1/messages',
  CHANNELS: '/api/v1/channels',
  LOGIN: '/api/v1/login',
  SIGNUP: '/api/v1/signup',
};

export const getMessagesPath = () => API_ROUTER.MESSAGES;
export const getChannelPath = () => API_ROUTER.CHANNELS;
export const getLoginPath = () => API_ROUTER.LOGIN;
export const getSignupPath = () => API_ROUTER.SIGNUP;
