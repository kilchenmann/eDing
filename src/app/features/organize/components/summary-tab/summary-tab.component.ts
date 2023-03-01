import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    Dokument,
    Dossier,
    Ordner,
    Ordnungssystemposition,
    SIP
} from '../../models/xmlns/bar.admin.ch/arelda/sip-arelda-v4';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
    selector: 'app-summary-tab',
    templateUrl: './summary-tab.component.html',
    styleUrls: ['./summary-tab.component.scss']
})
export class SummaryTabComponent {
    @Input() sip!: SIP;
    @Input() dataSource!: MatTreeNestedDataSource<Ordner>;
    @Output() addIngestPackage = new EventEmitter<Ordner>;
    @Output() addAllIngestPackages = new EventEmitter<Ordner[]>;
    @Output() addFilesInSubfolder = new EventEmitter<boolean>;

    shouldAddFilesWithSubfolder = true;
    treeControl = new NestedTreeControl<Ordner>(node => node.ordner);
    displayDokDetails = false;
    fileName = '';
    osp?: Ordnungssystemposition;
    dok?: Dokument;
    dos?: Dossier;

    // check, if a node has child nodes
    hasChild = (_: number, node: Ordner) => (!!node.ordner && node.ordner.length > 0) || (!!node.datei && node.datei.length > 0);


    // todo: these two functions should be in the service somehow as they also get used in another page
    /**
     * gets file meta
     * @param dateiRef
     */
    getFileMeta(dateiRef: string) {
        // reset dok and dos
        this.osp = undefined;
        this.dos = undefined;
        this.dok = undefined;

        // start on "ordnungssystemposition" to find dokument or dossier by "datei referenz"
        this._findOsp(this.sip.paket[0].ablieferung[0].ordnungssystem[0].ordnungssystemposition, dateiRef);

    }

    /**
     * geht durch die "ordnungssystemposition"-Hierarchie
     * @param ordnungssystemposition
     * @param dateiRef
     */
    private _findOsp(ordnungssystemposition: Ordnungssystemposition[], dateiRef: string) {
        ordnungssystemposition.forEach(
            (osp: Ordnungssystemposition) => {
                if (osp.ordnungssystemposition && osp.ordnungssystemposition.length > 0) {
                    this._findOsp(osp.ordnungssystemposition, dateiRef);
                }
                if (osp.dossier && osp.dossier.length > 0) {
                    osp.dossier.forEach(
                        (dos: Dossier) => {
                            if (dos.dokument && dos.dokument.length > 0) {
                                // dateiRef kommt erst im Dokument vor
                                dos.dokument.forEach(
                                    (dok: Dokument) => {
                                        if (dok.dateiRef && dok.dateiRef.length) {
                                            const index = dok.dateiRef.findIndex(ref => ref._text === dateiRef);
                                            if (index > -1) {
                                                this.dok = dok;
                                                this.dos = dos;
                                                this.osp = osp;
                                            }
                                        }
                                    }
                                );

                            } else if (dos.dateiRef && dos.dateiRef.length) {
                                // dateiRef kommt bereits im Dossier vor
                                const index = dos.dateiRef.findIndex(ref => ref._text === dateiRef);
                                if (index > -1) {
                                    this.dos = dos;
                                    this.osp = osp;
                                    return;
                                }
                            }
                        }
                    );
                }
            }
        );
    }
}
