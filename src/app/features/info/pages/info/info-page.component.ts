import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import packageInfo from '../../../../../../package.json';

@Component({
    selector: 'app-info-page',
    templateUrl: './info-page.component.html',
    styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent {

    constructor(private titleService: Title) {
        this.titleService.setTitle(`${packageInfo.name} > Info / Hilfe`);
    }
}
