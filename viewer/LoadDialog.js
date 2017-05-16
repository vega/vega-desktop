const { remote } = require('electron');
const dialog = remote.dialog;

module.exports = function(element, onLoad, onError) {
  return element.addEventListener('click', () => {
    dialog.showOpenDialog({
      title: "Select Vega file",
      filters: [
        {name: 'JSON Files', extensions: ['json']},
        {name: 'All Files', extensions: ['*']}
      ]
    }, fileNames => {
      // fileNames is an array that contains all the selected
      if(fileNames === undefined){
        if (onError) {
          onError("No file selected");
        }
      } else {
        onLoad(fileNames[0]);
      }
    });
  });
}