import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import ApiContextProvider from './contexts/ApiContextProvider.jsx';
import store from './slices/index.js';
import App from './App';
import resources from './locales/index.js';

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

const init = () => (
  <ApiContextProvider>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </ApiContextProvider>
);

export default init;
