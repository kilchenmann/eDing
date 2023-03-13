import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {

    constructor() { }

    getTempPath() {
        const os = navigator.userAgent.toLowerCase();
        switch (true) {
            case os.indexOf('win') > -1:
                return '/c/Windows/Temp';
            case os.indexOf('mac') > -1:
                return '/private/tmp';
            case os.indexOf('linux') > -1:
                return '/var/tmp';
            default:
                return 'c/windows/temp';
        }
    }
}
