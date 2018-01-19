import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.jsx';

// To prevent redirecting to the file when dropping anything
// https://stackoverflow.com/questions/31670803/prevent-electron-app-from-redirecting-when-dragdropping-items-in-window
document.addEventListener('dragover', event => event.preventDefault())
document.addEventListener('drop', event => event.preventDefault())

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
