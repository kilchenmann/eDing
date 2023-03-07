import { Component } from '@angular/core';
import { NavItem } from './shared/models/nav-item';
import packageInfo from '../../package.json';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    appVersion = `v${packageInfo.version}`;

    navItems: NavItem[] = [
        {
            label: 'Playground',
            route: 'playground'
        },
        {
            label: 'XSD to TS',
            route: 'xsd2ts'
        },
        {
            label: 'XML to JSON',
            route: 'xml2json'
        },
        {
            label: 'JSON to XML',
            route: 'json2xml'
        }
    ];
}
