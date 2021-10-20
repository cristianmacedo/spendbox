import React from 'react';

import ReactDOM from 'react-dom';

import { ColorModeScript } from '@chakra-ui/react';

import reportWebVitals from 'config/reportWebVitals';
import serviceWorker from 'config/serviceWorker';
import theme from 'config/theme';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.initialColorMode} />
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line no-console
reportWebVitals(console.log);
