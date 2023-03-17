import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import packageInfo from '../../package.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    appVersion = `v${packageInfo.version}`;
    lastRoute = '';

    subContainer = new Subscription();

    constructor(private router: Router) {
    }

    ngOnInit() {
        // subscribe to router to get lastRoute
        this.subContainer.add(this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.lastRoute = event.url;
            }
        }));

        // add last route before window close
        window.addEventListener('beforeunload', () => {
            window.localStorage.setItem('lastRoute', this.lastRoute);
        });

        // read last route from store and navigate
        const lastRoute = window.localStorage.getItem('lastRoute');
        if (lastRoute) {
            this.router.navigate([lastRoute]);
        }
    }

    ngOnDestroy() {
        this.subContainer.unsubscribe();
    }
}
