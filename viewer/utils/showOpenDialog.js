const { remote } = require('electron');
const dialog = remote.dialog;

export default function() {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog({
      title: "Select Vega file",
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    }, fileNames => {
      // fileNames is an array that contains all the selected
      if (fileNames === undefined) {
        if (onError) {
          reject("No file selected");
        }
      } else {
        resolve(fileNames[0]);
      }
    });
  });
}