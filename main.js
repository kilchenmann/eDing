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
        maxHeight: height,
        maxWidth: 2024,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: true
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

    ipcMain.handle('get-temp-path', async () => path.join(app.getPath('temp'), 'sip.zip'));

    let retryCount = 0;
    const maxRetries = 5;

    function handleLoadFail(url) {
        if (retryCount < maxRetries) {
            // eslint-disable-next-line no-console
            console.error(`Page failed to load. Retrying (${retryCount + 1} of ${maxRetries})...`);
            win.loadURL(url);
            retryCount++;
        } else {
            // eslint-disable-next-line no-console
            console.error(`Page failed to load after ${maxRetries} attempts. Exiting.`);
            app.exit(1);
        }
    }

    const index = (dev ? 'http://localhost:4200' : `file://${path.join(__dirname, 'dist/ech-0160-dimag-ingest/index.html')}`);

    win.loadURL(index);

    win.webContents.on('did-fail-load', () => {
        handleLoadFail(index);
    });

}

app.on('ready', onReady);
