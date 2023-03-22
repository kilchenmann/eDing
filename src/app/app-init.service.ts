import { Injectable } from '@angular/core';

// const fs = require('fs');
// const sys = require('os');
// const path = require('path');

// const { app, BrowserWindow, ipcMain, screen } = require('electron');

// const os = require('os');
import * as os from 'os';


// import remote from 'remote';
// const app = remote.require('app');

@Injectable({
    providedIn: 'root'
})
export class AppInitService {

    constructor() { }

    getTempPath() {
        // return 'C:\Windows\Temp';

        console.log('temp dir: ', os.tmpdir());

        return os.tmpdir();
        // const os = window.navigator.userAgent.toLowerCase();
        // console.log( window.fs.getTempPath )

        // const tmpDir = fs.mkdtempSync(path.join(sys.tmpdir(), 'ech'));
        // // navigator.u userAgentData .toLowerCase();
        // console.log('get OS: ', os);
        // switch (true) {
        //     case os.indexOf('win') > -1:



        //         // os.tmpdir();


        //         // os.tmpDir();
        //         // os.
        //         // browserWindow.ge

        //         // remote

        //         // require('electron').remote.app.getAppPath()


        //         // require("path").dirname(require('electron').app.getTempPath(); // .remote.app.

        //         // console.log('win: C:\\Windows\\Temp\\?', app.getTempPath());
        //         return null;
        //     case os.indexOf('mac') > -1:
        //         console.log('mac: /private/tmp/');
        //         return '/private/tmp/';
        //     case os.indexOf('linux') > -1:
        //         console.log('linux: /var/tmp/');
        //         return '/var/tmp/';
        //     default:
        //         console.log('default: /c/Windows/Temp/');
        //         return '/c/Windows/Temp/';
        // }
    }
}
