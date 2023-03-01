import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-headline',
    templateUrl: './headline.component.html'
})
export class HeadlineComponent {
    @Input() title = 'Haupttitel';
    @Input() subtitle = 'Untertitel';
}
