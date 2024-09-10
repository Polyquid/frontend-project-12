import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
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

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_PRODUCTION_TOKEN,
    environment: 'production',
  };

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18nextInstance}>
            <Provider store={store}>
              <RouterProvider router={router}>
                <App />
              </RouterProvider>
              <ToastContainer autoClose={3000} />
            </Provider>
          </I18nextProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>,
  );
};

export default init;
