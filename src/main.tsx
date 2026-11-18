import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TimeFormatProvider } from './context/TimeFormatContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TimeFormatProvider>
      <App />
    </TimeFormatProvider>
  </React.StrictMode>,
);
