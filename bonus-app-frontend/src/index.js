  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { BrowserRouter } from 'react-router-dom';

  import './index.css';
  import App from './App';
  import reportWebVitals from './reportWebVitals';

  const root = ReactDOM.createRoot(document.getElementById('root'));

  // Оборачиваем <App /> в <BrowserRouter> для маршрутизации
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );

  // Если нужно измерять производительность:
  reportWebVitals();