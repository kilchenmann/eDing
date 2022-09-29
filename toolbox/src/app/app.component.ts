import { Component } from '@angular/core';
import { NavItem } from './shared/models/nav-item';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
        }
    ];
}
