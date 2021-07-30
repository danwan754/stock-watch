import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MainContextProvider } from './contexts/MainContext';
import { LoginContextProvider } from './contexts/LoginContext';

ReactDOM.render(
  <MainContextProvider>
    <LoginContextProvider>
      <App />
    </LoginContextProvider>
  </MainContextProvider>,
  document.getElementById('root')
);

