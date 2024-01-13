import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { CheckoutProvider } from './context/CheckoutContext'


ReactDOM.render(
  <React.StrictMode>
    <CheckoutProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </CheckoutProvider>
  </React.StrictMode>,
  document.getElementById('root')
);