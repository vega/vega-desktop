const {remote} = require('electron');

const {dialog} = remote;

export function showOpenDialog() {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog({
      title: 'Load Vega file',
      filters: [
        {name: 'JSON Files', extensions: ['json']},
        {name: 'All Files', extensions: ['*']}
      ]
    }, fileNames => {
      // FileNames is an array that contains all the selected
      if (fileNames === undefined) {
        reject('No file selected');
      } else {
        resolve(fileNames[0]);
      }
    });
  });
}

export function showSaveDialog() {
  return new Promise((resolve, reject) => {
    dialog.showSaveDialog({
      title: 'Export',
      filters: [
        {name: 'All supported formats', extensions: ['png', 'svg']},
        {name: 'PNG', extensions: ['png']},
        {name: 'SVG', extensions: ['svg']}
      ]
    }, filename => {
      if (filename) {
        resolve(filename);
      } else {
        reject(filename);
      }
    });
  });
}
