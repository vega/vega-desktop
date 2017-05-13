const fs = require('fs');

const helper = require('./viewer/helper.js');
const FORMAT = helper.FORMAT;

const DragAndDrop = require('./viewer/DragAndDrop.js');
const LoadDialog = require('./viewer/LoadDialog.js');

const vg = require('vega');
const vl = require('vega-lite');

const state = {
  mode: 'vega',
  filepath: null,
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

function readFile(filepath){
  fs.readFile(filepath, 'utf-8', function (err, data) {
    if(err){
      alert('An error occurred reading the file :' + err.message);
      return;
    }

    document.title = `Vega Desktop - ${filepath}`;
    state.mode = helper.getFormatFromFileName(filepath);

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
  const spec = state.spec;
  if(spec) {
    let vegaSpec;

    if (state.mode === FORMAT.VEGA_LITE) {
      try {
        vegaSpec = vl.compile(spec).spec;
      } catch (ex) {
        showError(`Invalid vega-lite spec: ${ex.message}`);
        return;
      }
    } else if (state.mode === FORMAT.UNKNOWN) {
      try {
        vegaSpec = vl.compile(spec).spec;
      } catch (ex) {
        vegaSpec = spec;
      }
    } else {
      vegaSpec = spec;
    }

    vis.innerHTML = '';
    try {
      const runtime = vg.parse(vegaSpec);
      if (view) {
        view.finalize();
      }
      view = new vg.View(runtime)
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
