const apiPath = '/api/v1';

export const routes = {
  notFound: '*',
  chat: '/',
  login: '/login',
  signup: '/signup',
};

export const apiRoutes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  channelPath: (id) => [apiPath, 'channels', id].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
};
