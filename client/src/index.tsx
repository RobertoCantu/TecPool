import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import reportWebVitals from './reportWebVitals';
import ThemeConfig from './theme';

// context 
import { AuthProvider } from './contexts/AuthContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <AuthProvider>
          <ThemeConfig>
            <CollapseDrawerProvider>
              <App />
            </CollapseDrawerProvider>
          </ThemeConfig>
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
