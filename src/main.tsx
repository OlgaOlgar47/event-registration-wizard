import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/App';
import { Provider } from 'react-redux';
import { store } from '@/store';
import './assets/fonts/fonts.css';
import './global.scss';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
