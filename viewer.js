const { remote } = require('electron');
const fs = require('fs');
const path = require('path');
const vg = require('vega');
const vl = require('vega-lite');

const helper = require('./viewer/helper.js');
const FORMAT = helper.FORMAT;
const DragAndDrop = require('./viewer/DragAndDrop.js');
const LoadDialog = require('./viewer/LoadDialog.js');

const state = {
  mode: 'vega',
  filePath: null,
  spec: null
};
let view = null;

const vegaBtn = document.getElementById('vega-btn');
const vegaLiteBtn = document.getElementById('vega-lite-btn');
const vis = document.getElementById('vis');

function showError(msg) {
  vis.innerHTML = msg;
}

function updateFormatButtons() {
  switch(state.mode) {
    case FORMAT.VEGA:
      vegaBtn.className = 'button -purple center';
      vegaLiteBtn.className = 'button -gray center';
      break;
    case FORMAT.VEGA_LITE:
      vegaLiteBtn.className = 'button -purple center';
      vegaBtn.className = 'button -gray center';
      break;
    default:
      vegaLiteBtn.className = 'button -gray center';
      vegaBtn.className = 'button -gray center';
  }
}

vegaBtn.addEventListener('click', () => {
  state.mode = FORMAT.VEGA;
  updateFormatButtons();
  render();
});

vegaLiteBtn.addEventListener('click', () => {
  state.mode = FORMAT.VEGA_LITE;
  updateFormatButtons();
  render();
});

function readFile(filePath){
  fs.readFile(filePath, 'utf-8', function (err, data) {
    if(err){
      alert('An error occurred reading the file :' + err.message);
      return;
    }

    document.title = `Vega Desktop - ${filePath}`;
    state.filePath = filePath;
    state.mode = helper.getFormatFromFileName(filePath);

    try {
      state.spec = JSON.parse(data);
      state.mode = helper.getFormatFromSpec(state.spec);
      render();
    } catch(ex) {
      showError(`Error: ${ex.message}`);
    }

    updateFormatButtons();
  });
}

function render() {
  const { spec, mode, filePath } = state;
  if(spec) {
    let vegaSpec;

    if (mode === FORMAT.VEGA_LITE) {
      try {
        vegaSpec = vl.compile(spec).spec;
      } catch (ex) {
        showError(`Invalid vega-lite spec: ${ex.message}`);
        return;
      }
    } else if (mode === FORMAT.UNKNOWN) {
      try {
        vegaSpec = vl.compile(spec).spec;
      } catch (ex) {
        vegaSpec = spec;
      }
    } else {
      vegaSpec = spec;
    }

    // Clear existing view
    if (view) {
      view.finalize();
    }
    vis.innerHTML = '';

    try {
      const runtime = vg.parse(vegaSpec);

      // Tell loader to resolve data and image files
      // relative to the spec file
      const loader = new vg.loader({
        baseURL: path.dirname(filePath),
        mode: 'file'
      });

      view = new vg.View(runtime, { loader })
        .initialize(vis)
        .hover()
        .run();
    } catch (ex) {
      showError(`Invalid vega spec: ${ex.message}`);
    }
  }
}

LoadDialog(document.getElementById('load-btn'), readFile, showError);
DragAndDrop(document.getElementById('drop-area'), readFile);

const incomingFilePath = remote.getCurrentWindow().extraInfo.filePath;
if (incomingFilePath) {
  readFile(incomingFilePath);
}
