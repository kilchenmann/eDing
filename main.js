const { app, dialog, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const args = process.argv.slice(2);
const dev = args.indexOf('--dev') !== -1;

function onReady() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    win = new BrowserWindow({
        width,
        height,
        minHeight: 720,
        minWidth: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: true,
            preload: `file://${path.join(__dirname, 'dist/ech-0160-dimag-ingest/preload.js')}`
        }
    });

    ipcMain.handle('show-save-dialog', async () => {
        const result = await dialog.showOpenDialog(win, {
            properties: ['openDirectory', 'createDirectory']
        });

        if (!result.canceled) {
            return result.filePaths[0];
        }
    });

    ipcMain.handle('get-temp-path', async () => app.getPath('temp'));

    const retryCount = 0;
    const maxRetries = 3;

    function handleLoadFail(url, retry, max) {
        if (retry < max) {
            // eslint-disable-next-line no-console
            console.log(`Page failed to load. Retrying (${retry + 1} of ${max})...`);
            win.loadURL(url);
            retry++;
        } else {
            // eslint-disable-next-line no-console
            console.error(`Page failed to load after ${max} attempts. Exiting.`);
            app.exit(1);
        }
    }

    if (dev) {
        const devUrl = 'http://localhost:4200';
        win.loadURL(devUrl);

        win.webContents.on('did-fail-load', () => {
            handleLoadFail(devUrl, retryCount, maxRetries);
        });

    } else {
        const prodUrl = `file://${path.join(__dirname, 'dist/ech-0160-dimag-ingest/index.html')}`;

        win.loadURL(prodUrl)
            .then(() => {
                win.webContents.send('sendSettings', tempDir);
            })
            .then(() => {
                win.show();
            });

        win.webContents.on('did-fail-load', () => {
            handleLoadFail(prodUrl, retryCount, maxRetries);
        });
    }
}

app.on('ready', onReady);
