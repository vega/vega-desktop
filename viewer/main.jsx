import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// To prevent redirecting to the file when dropping anything
// https://stackoverflow.com/questions/31670803/prevent-electron-app-from-redirecting-when-dragdropping-items-in-window
document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());

ReactDOM.render(
  <App />,
  document.querySelector('#app')
);

// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error('Sorry, this app does not support window.eval().');
};
