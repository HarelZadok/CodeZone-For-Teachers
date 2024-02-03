import '../../firebase_config';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

window.addEventListener('mouseup', (e) => {
  if (e.button === 3 || e.button === 4) e.preventDefault();
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
