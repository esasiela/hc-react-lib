import React from 'react';
import ReactDOM from 'react-dom/client';
import HcHomeApp from './pages/hc-home-app';

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HcHomeApp />
  </React.StrictMode>
);
