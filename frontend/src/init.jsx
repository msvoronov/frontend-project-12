import { Provider } from 'react-redux';
import store from './slices/index.js';
import App from './App';

const init = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default init;
