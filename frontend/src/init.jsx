import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
// import i18next from 'i18next';
// import { I18nextProvider, initReactI18next } from 'react-i18next';
// import { Provider } from 'react-redux';
// import { RouterProvider } from 'react-router-dom';
// import resources from './locales/index.js';
// import router from './utils/router.jsx';
// import store from './services/index.js';
// import App from './components/App.jsx';

const TestError = () => {
  const a = null;
  return a.hello();
};

const init = async () => {
  // const i18nextInstance = i18next.createInstance();
  // await i18nextInstance
  //   .use(initReactI18next)
  //   .init({
  //     resources,
  //     lng: 'ru',
  //     interpolation: {
  //       escapeValue: false,
  //     },
  //     debug: true,
  //   });

  const rollbarConfig = {
    accessToken: '765d232201e348538ba66a7b8b67c4ea',
    environment: 'testenv',
  };
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
        {/* <I18nextProvider i18n={i18nextInstance}>
          <Provider store={store}>
            <RouterProvider router={router}>
              <App />
            </RouterProvider>
          </Provider>
        </I18nextProvider> */}
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
