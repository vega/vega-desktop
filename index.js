const electron = require('electron');
const app = electron.app;
const path = require('path');
const url = require('url');

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')({ showDevTools: true });

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 800,
		height: 600
	});

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'viewer.html'),
    protocol: 'file:',
    slashes: true
  }));

	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.	if (!mainWindow) {
	mainWindow = createMainWindow();
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
