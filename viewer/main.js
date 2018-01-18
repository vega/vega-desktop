const { remote } = require('electron');
const fs = require('fs');
const path = require('path');
const vg = require('vega');
const vl = require('vega-lite');
const chokidar = require('chokidar');

const helper = require('./helper.js');
const FORMAT = helper.FORMAT;
const DragAndDrop = require('./DragAndDrop.js');
const LoadDialog = require('./LoadDialog.js');

const state = {
  mode: 'vega',
  filePath: null,
  spec: null,
  watching: false,
};
let view = null;
let watcher = null;

const watchBtn = document.getElementById('watch-btn');
const vegaBtn = document.getElementById('vega-btn');
const vegaLiteBtn = document.getElementById('vega-lite-btn');
const vis = document.getElementById('vis');

function showError(msg) {
  vis.innerHTML = msg;
}

function updateButtons() {
  if (state.watching) {
    watchBtn.className = 'button -gold center';
  } else {
    watchBtn.className = 'button -gray center';
  }

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

watchBtn.addEventListener('click', () => {
  if (state.watching) {
    unwatch();
  } else {
    watch(state.filePath);
  }
  state.watching = !state.watching;
  updateButtons();
})

vegaBtn.addEventListener('click', () => {
  state.mode = FORMAT.VEGA;
  updateButtons();
  render();
});

vegaLiteBtn.addEventListener('click', () => {
  state.mode = FORMAT.VEGA_LITE;
  updateButtons();
  render();
});

function watch(filePath) {
  if (filePath) {
    unwatch();
    watcher = chokidar.watch(filePath)
      .on('change', () => {
        readFile(filePath);
      });
  }
}

function unwatch() {
  if (watcher) {
    watcher.close();
    watcher = null;
  }
}

function handleFile(filePath) {
  readFile(filePath);
  if (state.watching) {
    watch(filePath);
  }
}

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

    updateButtons();
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

LoadDialog(document.getElementById('load-btn'), handleFile, showError);
DragAndDrop(document.getElementById('drop-area'), handleFile);

const incomingFilePath = remote.getCurrentWindow().extraInfo.filePath;
if (incomingFilePath) {
  handleFile(incomingFilePath);
}

import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.jsx';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
