import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ordner } from '../../../../shared/models/xmlns/bar.admin.ch/arelda/sip-arelda-v4';

@Component({
    selector: 'app-package-expansion-panel',
    templateUrl: './package-expansion-panel.component.html',
    styleUrls: ['./package-expansion-panel.component.scss']
})
export class PackageExpansionPanelComponent {
    @Input() ingestPackages!: Ordner[];
    @Output() removeIngestPackage = new EventEmitter<Ordner>;
    @Output() exportAllIngestPackages = new EventEmitter<Ordner[]>;
    @Output() removeAllIngestPackages = new EventEmitter<void>;
}
