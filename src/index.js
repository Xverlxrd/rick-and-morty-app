import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { DataProvider } from './components';
import './index.css';
import { PopupProvider } from './components/popup/PopupProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PopupProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </PopupProvider>
  </React.StrictMode>
);
