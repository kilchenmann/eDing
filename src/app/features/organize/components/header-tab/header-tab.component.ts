import { Component, Input } from '@angular/core';
import { SIP } from '../../../../shared/models/xmlns/bar.admin.ch/arelda/sip-arelda-v4';

@Component({
    selector: 'app-header-tab',
    templateUrl: './header-tab.component.html'
})
export class HeaderTabComponent   {
    @Input() sip!: SIP;
}
