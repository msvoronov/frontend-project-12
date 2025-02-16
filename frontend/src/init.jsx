import { Provider } from 'react-redux';
import ApiContextProvider from './contexts/ApiContextProvider.jsx';
import store from './slices/index.js';
import App from './App';

// инит i18n, создать компонент реакт и обернть Provider в него
const init = () => (
  <ApiContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ApiContextProvider>
);

export default init;
