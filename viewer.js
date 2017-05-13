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
  spec: null,
  vis: null,
};

const vegaBtn = document.getElementById('vega-btn');
const vegaLiteBtn = document.getElementById('vega-lite-btn');

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
    try {
      vegaSpec = state.mode==='vega' ? spec : vl.compile(spec).spec;
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

LoadDialog(document.getElementById('load-btn'), readFile, showError);
DragAndDrop(document.getElementById('drop-area'), readFile);
