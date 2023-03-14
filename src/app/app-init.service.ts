import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {

    constructor() { }

    getTempPath() {
        return 'C:\Windows\Temp';
        // const os = window.navigator.userAgentData.toLowerCase()
        // Navigator.userAgentData.toLowerCase()
        // navigator.u userAgentData .toLowerCase();
        // console.log('get os name: ', os);
        // switch (true) {
        //     case os.indexOf('win') > -1:
        //         return 'C:\Windows\Temp';
        //     case os.indexOf('mac') > -1:
        //         return '/private/tmp';
        //     case os.indexOf('linux') > -1:
        //         return '/var/tmp';
        //     default:
        //         return 'c/windows/temp';
        // }
    }
}
