import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyles, muiTheme } from './ui';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router';
import { CssBaseline, ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <GlobalStyles />
      <CssBaseline />
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  </React.StrictMode>,
);
