import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import resources from './locales/index.js';
import router from './utils/router.jsx';
import store from './services/index.js';
import App from './components/App.jsx';

const init = async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      debug: true,
    });
  return (
    <I18nextProvider i18n={i18nextInstance}>
      <Provider store={store}>
        <RouterProvider router={router}>
          <App />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            draggable
          />
        </RouterProvider>
      </Provider>
    </I18nextProvider>
  );
};

export default init;
