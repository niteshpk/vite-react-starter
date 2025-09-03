import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router/router';
import { ThemeProvider } from '@/theme/theme-provider';
import { LocaleProvider } from '@/i18n/locale-provider';
import '@/styles/tailwind.css';
import '@/i18n/i18n';

const rootElement = document.getElementById('root');
if (!rootElement) {
   throw new Error("Root element with id 'root' not found");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
   <React.StrictMode>
      <LocaleProvider>
         <ThemeProvider>
            <RouterProvider router={router} />
         </ThemeProvider>
      </LocaleProvider>
   </React.StrictMode>
);
