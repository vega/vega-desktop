const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// Adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')({showDevTools: true});

require('electron-context-menu')();

// Prevent window being garbage collected
const appWindows = [];
const fileQueue = [];

function onClosed(win) {
  // Dereference the window
  return () => {
    const index = appWindows.indexOf(win);
    appWindows.splice(index, 1);
  };
}

function createAppWindow(filePath) {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets', 'icon.icns'),
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.extraInfo = {
    filePath: filePath || null
  };

  // And load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'viewer', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.on('closed', onClosed(win));
  appWindows.push(win);
  return win;
}

app
  .on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  })
  .on('open-file', (event, path) => {
    event.preventDefault();
    if (app.isReady()) {
      createAppWindow(path);
    } else {
      fileQueue.push(path);
    }
  })
  .on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (appWindows.length === 0) {
      createAppWindow();
    }
  })
  .on('ready', () => {
    const filePath = fileQueue.length > 0 ? fileQueue.shift() : null;
    createAppWindow(filePath);
  });
