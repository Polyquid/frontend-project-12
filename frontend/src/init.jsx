import React from 'react';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import resources from './locales/index.js';
import App from './App.jsx';

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
      debug: process.env.NODE_ENV === 'development',
    });

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_PRODUCTION_TOKEN,
    environment: process.env.NODE_ENV,
  };

  const socket = io();

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App
        rollbarConfig={rollbarConfig}
        i18nextInstance={i18nextInstance}
        socket={socket}
      />
    </React.StrictMode>,
  );
};

export default init;
