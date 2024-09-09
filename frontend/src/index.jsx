import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import init from './init.jsx';

const run = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const App = await init();
  root.render(
    <React.StrictMode>
      {App}
    </React.StrictMode>,
  );
};

run();
