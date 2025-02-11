const apiPath = '/api/v1';

export const routes = {
  notFound: '*',
  chat: '/',
  login: '/login',
  signup: '/signup',
};

export const apiRoutes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
};
