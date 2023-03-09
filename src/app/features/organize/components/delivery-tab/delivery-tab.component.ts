import { Component, Input } from '@angular/core';
import { Provenienz, SIP } from '../../models/xmlns/bar.admin.ch/arelda/sip-arelda-v4';

@Component({
    selector: 'app-delivery-tab',
    templateUrl: './delivery-tab.component.html'
})
export class DeliveryTabComponent {
    @Input() sip!: SIP;
    @Input() provenienz?: Provenienz;
}
