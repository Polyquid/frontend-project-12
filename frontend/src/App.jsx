import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import SocketContext from './contexts';

const App = ({
  rollbarConfig,
  i18nextInstance,
  store,
  router,
  socket,
}) => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <I18nextProvider i18n={i18nextInstance}>
        <Provider store={store}>
          <SocketContext.Provider value={socket}>
            <RouterProvider router={router} />
            <ToastContainer autoClose={3000} />
          </SocketContext.Provider>
        </Provider>
      </I18nextProvider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;
