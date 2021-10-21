import React from 'react';
import ReactDOM from 'react-dom';


/* --------
 * Load Styles
 * -------- */
import './assets/styles/index.scss';


/* --------
 * Import App
 * -------- */
import App from './app';


/* --------
 * Import WebVitals
 * -------- */
import reportWebVitals from './reportWebVitals';


/* --------
 * Render the App
 * -------- */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
