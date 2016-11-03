const app = require('electron').remote;
const dialog = app.dialog;
const fs = require('fs');

const vg = require('vega');
const vl = require('vega-lite');

const state = {
  mode: 'vega',
  filepath: null,
  rawSpec: null,
  vis: null,
};

function readFile(filepath){
  fs.readFile(filepath, 'utf-8', function (err, data) {
    if(err){
      alert('An error occurred reading the file :' + err.message);
      return;
    }

    document.title = `Vega View - ${filepath}`;

    try {
      const rawSpec = JSON.parse(data);
      state.rawSpec = rawSpec;
      render();
    } catch(ex) {
      showError(`Error: ${ex.message}`);
    }
  });
}

function render() {
  const rawSpec = state.rawSpec;
  if(rawSpec) {
    let vegaSpec;
    try {
      vegaSpec = state.mode==='vega' ? rawSpec : vl.compile(rawSpec).spec;
      vis.innerHTML = '';
      vg.parse.spec(vegaSpec, (error, chart) => {
        state.vis = chart({ el: '#vis' }).update();
      });
    } catch (ex) {
      showError(`Invalid spec for ${state.mode}`);
    }
  }
}

const vis = document.getElementById('vis');

function showError(msg) {
  vis.innerHTML = msg;
}

document.getElementById('load-btn').addEventListener('click', () => {
  dialog.showOpenDialog({
    title: "Select Vega file",
    filters: [
      {name: 'JSON Files', extensions: ['json']},
      {name: 'All Files', extensions: ['*']}
    ]
  }, fileNames => {
    // fileNames is an array that contains all the selected
    if(fileNames === undefined){
      console.log("No file selected");
    } else {
      readFile(fileNames[0]);
    }
  });
});

const vegaBtn = document.getElementById('vega-btn');
const vegaLiteBtn = document.getElementById('vega-lite-btn');

vegaBtn.addEventListener('click', () => {
  state.mode = 'vega';
  vegaBtn.className = 'button -purple center';
  vegaLiteBtn.className = 'button -gray center';
  render();
});

vegaLiteBtn.addEventListener('click', () => {
  state.mode = 'vega-lite';
  vegaLiteBtn.className = 'button -purple center';
  vegaBtn.className = 'button -gray center';
  render();
});

const dropTarget = document.getElementById('drop-area');

dropTarget.ondragover = function(e){
  if(dropTarget.className.indexOf('landing')===-1) {
    dropTarget.className += ' landing';
  }
  return false;
};
dropTarget.ondragleave = function(e){
  dropTarget.className = dropTarget.className.replace('landing', '');
  return false;
};
dropTarget.ondrop = function(e){
  e.preventDefault();

  dropTarget.className = dropTarget.className.replace('landing', '');
  file = e.dataTransfer.files[0];
  readFile(file.path);
  return false;
};

// window.addEventListener('resize', ()=>{
//     "width": document.documentElement.clientWidth - 40 - 10,
//     "height": document.documentElement.clientHeight - 40 - 10,
//   render();
// });


// document.ondragover = document.ondrop = (ev) => {
//   ev.preventDefault()
// }

// document.body.ondrop = (ev) => {
//   console.log(ev.dataTransfer.files[0].path)
//   ev.preventDefault()
// }