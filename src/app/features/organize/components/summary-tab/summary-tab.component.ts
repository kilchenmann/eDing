import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
    Dokument,
    Dossier,
    Ordner,
    Ordnungssystemposition,
    SIP
} from '../../../../shared/models/xmlns/bar.admin.ch/arelda/sip-arelda-v4';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { isEqual } from 'lodash';
import { OrganizeService } from '../../services/organize.service';

@Component({
    selector: 'app-summary-tab',
    templateUrl: './summary-tab.component.html',
    styleUrls: ['./summary-tab.component.scss']

})
export class SummaryTabComponent implements OnInit, OnDestroy {
    @Input() sip!: SIP;
    @Input() dataSource!: MatTreeNestedDataSource<Ordner>;
    @Input() alreadyAddedPackages: { node: Ordner; addFilesFromSubfolders: boolean }[] = [];
    @Output() addIngestPackage = new EventEmitter<Ordner>;
    @Output() addAllIngestPackages = new EventEmitter<Ordner[]>;
    @Output() addFilesInSubfolder = new EventEmitter<boolean>;

    treeControl = new NestedTreeControl<Ordner>(node => node.ordner);
    areAllNodesExpanded!: boolean;

    shouldAddFilesWithSubfolder!: boolean;
    displayDokDetails = false;
    fileName = '';
    osp?: Ordnungssystemposition;
    dok?: Dokument;
    dos?: Dossier;

    constructor(private organizeService: OrganizeService) {
    }

    ngOnInit() {
        // store tree expansion model before window close
        window.addEventListener('beforeunload', () => {
            window.localStorage.setItem('treeExpansionModel', JSON.stringify(Array.from(this.treeControl.expansionModel.selected)));
            window.localStorage.setItem('shouldAddFilesWithSubfolder', JSON.stringify(this.shouldAddFilesWithSubfolder));
        });

        this.treeControl.dataNodes = this.dataSource.data;

        // get stored expansion model
        const storedExpansionModel = window.localStorage.getItem('treeExpansionModel');
        if (storedExpansionModel) {
            const selectedNodes = JSON.parse(storedExpansionModel);
            this.expandNodes(selectedNodes, this.treeControl.dataNodes);
            this.areAllNodesExpanded = this.checkAllExpanded();
        }

        // get stored shouldAddFilesWithSubfolder boolean
        const shouldAddFilesWithSubfolder = window.localStorage.getItem('shouldAddFilesWithSubfolder');
        void (shouldAddFilesWithSubfolder ? this.shouldAddFilesWithSubfolder = JSON.parse(shouldAddFilesWithSubfolder) : this.shouldAddFilesWithSubfolder = true);

        // subscribe to expansion model changes
        this.treeControl.expansionModel.changed.subscribe(() => {
            this.areAllNodesExpanded = this.checkAllExpanded();
        });
    }

    expandNodes(selectedNodes: Ordner[], nodes: Ordner[]): void {
        nodes.forEach((node: Ordner) => {
            const isSelected = selectedNodes.some((selectedNode) => isEqual(selectedNode, node));
            if (isSelected) {
                this.treeControl.expand(node);
                if (node.ordner && node.ordner.length > 0) {
                    this.expandNodes(selectedNodes, node.ordner);
                }
            }
        });
    }

    checkAllExpanded(): boolean {
        const hasUnexpandedNode = (node: Ordner): boolean => {
            if (!this.treeControl.isExpanded(node)) {
                return true;
            }
            if (node.ordner) {
                return node.ordner.some(hasUnexpandedNode);
            }
            return false;
        };

        return !(this.treeControl.dataNodes as Ordner[]).some(hasUnexpandedNode);
    }

    ngOnDestroy() {
        window.localStorage.setItem('treeExpansionModel', JSON.stringify(Array.from(this.treeControl.expansionModel.selected)));
        window.localStorage.setItem('shouldAddFilesWithSubfolder', JSON.stringify(this.shouldAddFilesWithSubfolder));
    }

    expandAll() {
        void (this.areAllNodesExpanded ? this.treeControl.collapseAll() : this.treeControl.expandAll());
    }

    // check, if a node has child nodes
    hasChild = (_: number, node: Ordner) => (!!node.ordner && node.ordner.length > 0) || (!!node.datei && node.datei.length > 0);

    // todo: the function should not get called on every click the user makes -> therefore we need to find a solution
    isAlreadyAdded(node: Ordner, addFilesFromSubfolders: boolean): boolean {
        return this.alreadyAddedPackages.some((addedPackage) =>
            (addedPackage.addFilesFromSubfolders === addFilesFromSubfolders || !node.ordner) &&
            this.organizeService.comparePackages(addedPackage.node, node)
        );
    }

    /*
     * gets file meta
     * @param dateiRef
     */
    getFileMeta(dateiRef: string) {
        const result = this.organizeService.findOsp(this.sip.paket[0].ablieferung[0].ordnungssystem[0].ordnungssystemposition, dateiRef);
        this.dos = result.dos;
        this.osp = result.osp;
        this.dok = result.dok;

    }
}
