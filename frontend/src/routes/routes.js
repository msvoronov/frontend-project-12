export const apiPath = '/api/v1';

export const routes = {
  notFound: '*',
  chat: '/',
  login: '/login',
  signup: '/signup',
};

export const apiRoutes = {
  loginPath: () => 'login',
  signupPath: () => 'signup',
  channelsPath: () => 'channels',
  channelPath: (id) => ['channels', id].join('/'),
  messagesPath: () => 'messages',
};
