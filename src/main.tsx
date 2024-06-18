import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { App } from './App';

import './assets/fonts/fonts.css';
import './global.scss';
import './i18n';

const theme = createTheme({
  palette: {
    primary: {
      main: '#092C4C',
    },
    secondary: {
      main: '#F2994A',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
});

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}
