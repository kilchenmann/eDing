const {app, dialog, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const args = process.argv.slice(2);
const dev = args.indexOf('--dev') !== -1;

function onReady() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width,
    height,
    webPreferences: { nodeIntegration: true, contextIsolation: false, webSecurity: true }
  });

  ipcMain.handle('show-save-dialog', async () => {
    const result = await dialog.showOpenDialog(win, {
        properties: ['openDirectory', 'createDirectory']
    });

    if (!result.canceled) {
      return result.filePaths[0];
    }
  });

  let retryCount = 0;
  const maxRetries = 3;

  if (dev) {
    const devUrl = 'http://localhost:4200';
    win.loadURL(devUrl);

    win.webContents.on('did-fail-load', () => {
      handleLoadFail(devUrl, retryCount, maxRetries)
    });

  } else {
    const prodUrl = `file://${path.join(__dirname, 'dist/ech-0160-dimag-ingest/index.html')}`;

    win.loadURL(prodUrl);

    win.webContents.on('did-fail-load', () => {
      handleLoadFail(prodUrl, retryCount, maxRetries)
    });
  }
}

function handleLoadFail(url, retryCount, maxRetries) {
  if (retryCount < maxRetries) {
    console.log(`Page failed to load. Retrying (${retryCount + 1} of ${maxRetries})...`);
    win.loadURL(url);
    retryCount++;
  } else {
    console.error(`Page failed to load after ${maxRetries} attempts. Exiting.`);
    app.exit(1);
  }
}

app.on('ready', onReady);
