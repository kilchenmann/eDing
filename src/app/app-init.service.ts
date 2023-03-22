import { Injectable } from '@angular/core';

const remote = require('remote');
const app = remote.require('app');

@Injectable({
    providedIn: 'root'
})
export class AppInitService {

    constructor() { }

    getTempPath() {
        // return 'C:\Windows\Temp';
        const os = window.navigator.userAgent.toLowerCase();
        // navigator.u userAgentData .toLowerCase();
        console.log('get OS: ', os);
        switch (true) {
            case os.indexOf('win') > -1:

                console.log('win: C:\\Windows\\Temp\\?', app.getTempPath());
                return app.getTempPath();
            case os.indexOf('mac') > -1:
                console.log('mac: /private/tmp/');
                return '/private/tmp/';
            case os.indexOf('linux') > -1:
                console.log('linux: /var/tmp/');
                return '/var/tmp/';
            default:
                console.log('default: /c/Windows/Temp/');
                return '/c/Windows/Temp/';
        }
    }
}
