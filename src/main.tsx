import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TimeFormatProvider } from './context/TimeFormatContext';
import { LanguageProvider } from './context/LanguageContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <TimeFormatProvider>
        <App />
      </TimeFormatProvider>
    </LanguageProvider>
  </React.StrictMode>,
);
