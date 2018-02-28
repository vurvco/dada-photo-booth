var app = require('app');
var BrowserWindow = require('browser-window');

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/* eslint-disable no-undef */
app.on('ready', function () {
  mainWindow = new BrowserWindow({width: 640, height: 480});

  mainWindow.loadURL(`file://${__dirname}/public/index.html`);

  mainWindow.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
/* eslint-enable no-undef */
