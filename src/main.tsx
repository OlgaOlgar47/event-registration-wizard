import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './assets/fonts/fonts.css';
import './global.scss';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
