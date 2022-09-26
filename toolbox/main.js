const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

function onReady () {
	win = new BrowserWindow({width: 1200, height: 6700})
	win.loadURL(url.format({
		pathname: path.join(
			__dirname,
			'dist/toolbox/index.html'),
		protocol: 'file:',
		slashes: true
	}))
}

app.on('ready', onReady);
