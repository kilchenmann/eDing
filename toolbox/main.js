/*
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
*/
const {app, BrowserWindow} = require('electron');  
const url = require('url');
const path = require('path');   
	
function onReady () {     
	win = new BrowserWindow({
		width: 900, 
		height: 6700,
		webPreferences: {nodeIntegration: true, contextIsolation: false, webSecurity: false}
	});

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

app.on('ready', onReady);
