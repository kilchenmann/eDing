const {app, dialog, BrowserWindow, ipcMain} = require('electron');
const url = require('url');
const path = require('path');
const args = process.argv.slice(2);
const dev = args.indexOf('--dev') !== -1;

function onReady() {
  win = new BrowserWindow({
    width: 900,
    height: 6700,
    webPreferences: { nodeIntegration: true, contextIsolation: false, webSecurity: true }
  });

  ipcMain.handle('show-save-dialog', async () => {
    const result = await dialog.showOpenDialog(win, {
        properties: ['openDirectory']
    });

    if (!result.canceled) {
      return result.filePaths[0];
    }
  });

  if (dev) {
    win.webContents.on('did-fail-load', () => {
      console.log('did-fail-load');
      win.loadURL(url.format({
        pathname: 'http://localhost:4200'
      }));
    });

    win.loadURL(url.format({
      pathname: 'http://localhost:4200'
    }));

  } else {
    win.webContents.on('did-fail-load', () => {
      console.log('did-fail-load');
      win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/toolbox/index.html'),
        protocol: 'file:',
        slashes: true
      }));
    });

    win.loadURL(url.format({
      pathname: path.join(
        __dirname,
        'dist/toolbox/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
}

app.on('ready', onReady);
