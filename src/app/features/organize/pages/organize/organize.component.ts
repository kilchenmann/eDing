import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ErrorMessage } from '../../models/error-message';
import {
    Datei,
    Dokument,
    Dossier,
    Ordner,
    Ordnungssystemposition,
    Provenienz,
    SIP
} from '../../models/xmlns/bar.admin.ch/arelda/sip-arelda-v4';
import { XML_OPTIONS } from '../../../../shared/models/xml-options';
import * as JSZip from 'jszip';
import { Router } from '@angular/router';
import { GenericDialogComponent } from '../../../../shared/generic-dialog/generic-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ElectronService } from 'ngx-electron';
import { cloneDeep, isEqual } from 'lodash';
import { Subscription } from 'rxjs';
import { OrganizeService } from '../../services/organize.service';
import { AppInitService } from 'src/app/app-init.service';


// xmlToJSON does not export itself as ES6/ECMA2015 module,
// it is loaded globally in scripts tag of angular.json,
// we still need to declare the namespace to make TypeScript compiler happy.
declare let xmlToJSON: any;

@Component({
    selector: 'app-organize',
    templateUrl: './organize.component.html',
    styleUrls: ['./organize.component.scss']
})
// todo: move some functions to organize.service.ts
export class OrganizeComponent implements OnInit, OnDestroy {
    sip: SIP = {
        paket: []
    };

    provenienz?: Provenienz;

    dataSource = new MatTreeNestedDataSource<Ordner>();

    // todo: where to use it?
    converterError = false;

    osp?: Ordnungssystemposition;
    dok?: Dokument;
    dos?: Dossier;

    error: ErrorMessage = {
        status: 415,
        title: 'Medientyp wird nicht unterstützt',
        text: 'Beim Konvertieren ist ein Fehler aufgetreten. Wahrscheinlich handelt es sich nicht um valides XML.'
    };

    // define form
    form: FormGroup = this.fb.group({
        testdata: [''],
        xml: ['', Validators.required],
        json: ['']
    });

    ingestPackages: Ordner[] = [];

    addFilesFromSubfolders = true;

    subContainer = new Subscription;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog,
        private electronService: ElectronService,
        private organizeService: OrganizeService,
        private _ais: AppInitService
    ) {
    }

    ngOnInit() {
        this._readCurrentMetadataXml();
    }

    ngOnDestroy() {
        this.subContainer.unsubscribe();
    }

    toggleAddFileMode() {
        this.addFilesFromSubfolders = !this.addFilesFromSubfolders;
    }

    /**
     * add ingest package
     * @param ingestPackage: ingest package which will be added
     */
    addIngestPackage(ingestPackage: Ordner) {
        const packageCopy = cloneDeep(ingestPackage);

        function processOrdner(node: Ordner, filePath: string, addFilesFromSubfolder: boolean) {
            filePath += node.name[0]._text + '/';
            if (node.datei && node.datei.length > 0) {
                node.datei.forEach((file) => {
                    file.path = { _value: filePath + file.name[0]._text };
                    packageCopy.datei = packageCopy.datei || [];
                    if (!packageCopy.datei.includes(file)) {
                        packageCopy.datei.push(file);
                    }
                });
            }
            if (!addFilesFromSubfolder) {
                return;
            }
            if (node.ordner) {
                node.ordner.forEach((ordner) => {
                    processOrdner(ordner, filePath, addFilesFromSubfolder);
                });
            }
        }

        processOrdner(packageCopy, '', this.addFilesFromSubfolders);

        if (!this.ingestPackages.find((existingPackage) => isEqual(existingPackage, packageCopy))) {
            this.ingestPackages.unshift(packageCopy);
        } else {
            alert('Error: Dieses Paket wurde schon hinzugefügt');
        }
    }

    /**
     * add all ingest packages
     * @param ingestPackages: ingest packages which should get added
     */
    addAllIngestPackages(ingestPackages: Ordner[]) {
        let showInfo = false;

        const searchPackages = (packages: Ordner[], parentPath: string = '') => {
            packages.forEach((ingestPackage) => {
                const packageCopy = cloneDeep(ingestPackage);
                const filePath = parentPath + packageCopy.name[0]._text + '/';

                if (packageCopy.datei && packageCopy.datei.length > 0) {
                    packageCopy.datei.forEach((file) => {
                        file.path = { _value: filePath + file.name[0]._text };
                    });
                    if (!this.ingestPackages.find((existingPackage) => isEqual(existingPackage, packageCopy))) {
                        this.ingestPackages.push(packageCopy);
                    } else {
                        showInfo = true;
                    }
                }
                if (packageCopy.ordner) {
                    searchPackages(packageCopy.ordner, filePath);
                }
            });
        };

        searchPackages(ingestPackages);

        if (showInfo) {
            alert('Info: Ein oder mehrere Paket/e konnten nicht hinzugefügt werden, da sie bereits vorhanden sind.');
        }
    }

    /**
     * remove ingest package
     * @param ingestPackage: ingest package which should get removed
     */
    removeIngestPackage(ingestPackage: Ordner) {
        const packageIndex = this.ingestPackages.findIndex(existingPackage => existingPackage === ingestPackage);
        if (packageIndex >= 0) {
            this.ingestPackages.splice(packageIndex, 1);
        } else {
            alert('Error: Paket konnte nicht gelöscht werden');
        }
    }

    /**
     * remove all ingest packages through setting an empty array
     */
    removeAllIngestPackage() {
        this.ingestPackages = [];
    }

    /**
     * export / save ingest packages to local storage
     * @param nodes - nodes / ingestPackages to export
     */
    exportAllIngestPackages(nodes: Ordner[]) {
        this.electronService.ipcRenderer.invoke('show-save-dialog').then((path: string) => {
            if (path) {
                // check if choosen folder is empty
                const isChoosenFolderEmpty = window.fs.readdirSync(path).length === 0 || window.fs.readdirSync(path).length === 1 && window.fs.readdirSync(path)[0] === '.DS_Store';
                if (isChoosenFolderEmpty) {
                    const moreThanOneNode = (nodes.length > 1);
                    // show dialog to user
                    const dialogRef = this.dialog.open(GenericDialogComponent, {
                        data: {
                            title: 'Ingest Pakete Exportieren',
                            text: `Es ${moreThanOneNode ? 'werden' : 'wird'} ${nodes.length} Ingest ${moreThanOneNode ? 'Pakete' : 'Paket'} gespeichert. Wollen Sie fortfahren?`,
                            showActions: true
                        }, panelClass: 'simple-dialog'
                    });

                    this.subContainer.add(dialogRef.afterClosed().subscribe(result => {
                        if (result) {
                            try {
                                // go through ingest packages, create xml and save files
                                nodes.forEach((node, index) => {
                                    // create metadata.xml
                                    const xmlDos = document.implementation.createDocument('', '', null);
                                    const paket = xmlDos.createElement('paket');
                                    paket.setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
                                    paket.setAttribute('xmlns', 'http://bar.admin.ch/arelda/v4');
                                    paket.setAttribute('xsi:schemaLocation', 'http://bar.admin.ch/arelda/v4 xsd/arelda.xsd');
                                    paket.setAttribute('xsi:type', 'paketAIP');
                                    paket.setAttribute('schemaVersion', '4.1');

                                    // header
                                    const paketTyp = xmlDos.createElement('paketTyp');
                                    paketTyp.innerHTML = 'AIP';
                                    paket.appendChild(paketTyp);

                                    const nameSIP = xmlDos.createElement('nameSIP');
                                    // todo: WARNING! Hardcoded, but we do not have this information yet
                                    nameSIP.innerHTML = 'SIP_20070923_KOST_eCH0160_1_1_GEVER';
                                    paket.appendChild(nameSIP);

                                    const version = xmlDos.createElement('version');
                                    version.innerHTML = '0.1';
                                    paket.appendChild(version);

                                    // inhaltsverzeichnis
                                    const inhaltsverzeichnis = xmlDos.createElement('inhaltsverzeichnis');

                                    const ordner = xmlDos.createElement('ordner');

                                    const name = xmlDos.createElement('name');
                                    name.innerHTML = node.name[0]._text;
                                    ordner.appendChild(name);

                                    const originalName = xmlDos.createElement('originalName');
                                    originalName.innerHTML = node.originalName[0]._text;
                                    ordner.appendChild(originalName);

                                    node.datei?.forEach(
                                        (dat: Datei) => {
                                            const datei = this.organizeService.createEle('datei', dat);
                                            ordner.appendChild(datei);
                                        }
                                    );

                                    inhaltsverzeichnis.appendChild(ordner);
                                    paket.appendChild(inhaltsverzeichnis);

                                    // ablieferung
                                    const ablieferung = this.organizeService.createEle('ablieferung', this.sip.paket[0].ablieferung[0]);

                                    // const ordnungssystemposition = xmlDos.createElement('ordnungssystemposition');
                                    const dossier = xmlDos.createElement('dossier');

                                    // // create metadata-dossier.xml
                                    node.datei?.forEach(
                                        (dat: Datei) => {
                                            this.getFileMeta(dat._attrid._value);

                                            if (this.dok) {
                                                const dokument = this.organizeService.createEle('dokument', this.dok, dat.originalName[0]._text);
                                                dossier.appendChild(dokument);
                                            }
                                        }
                                    );

                                    const ordnungssystem = ablieferung.getElementsByTagName('ordnungssystem').item(0);
                                    if (ordnungssystem) {
                                        if (this.osp) {
                                            const ordnungssystemposition = this.organizeService.createEle('ordnungssystemposition', this.osp);
                                            ordnungssystemposition.appendChild(dossier);
                                            ordnungssystem.appendChild(ordnungssystemposition);
                                        }
                                    }

                                    paket.appendChild(ablieferung);

                                    xmlDos.appendChild(paket);

                                    const comment = xmlDos.createComment(` ${new Date().toLocaleString('de-CH')} | Automatically generated by AV DIMAG (CH) Ingest Preparation Module `);
                                    xmlDos.appendChild(comment);

                                    const serializer = new XMLSerializer();
                                    const xmlString = `<?xml version="1.0" encoding="UTF-8"?> ${serializer.serializeToString(xmlDos)}`;

                                    const xmlFile = new Blob([xmlString], { type: 'application/xml' });
                                    const xmlReader = new FileReader();
                                    const newPath = `${path}/${node.name[0]._text}_${index}`;
                                    xmlReader.readAsArrayBuffer(xmlFile);

                                    xmlReader.onloadend = function () {
                                        const xmlBuffer = new Uint8Array(xmlReader.result as ArrayBuffer);
                                        window.fs.mkdirSync(newPath);
                                        window.fs.writeFile(
                                            `${newPath}/${node.name[0]._text}_${index}.xml`,
                                            xmlBuffer, (error: Error) => {
                                                if (error) {
                                                    console.error(error);
                                                }
                                            });
                                    };

                                    node.datei?.forEach(async (dat, datIntdex) => {
                                        const zip = await this._getCurrentZipFile();
                                        const keys = Object.keys(zip.files);
                                        // get binary data for the file from the uploaded zip-file
                                        const filePath = keys.find(key => key.endsWith(dat.path._value)) ?? '';

                                        const foundFile = await zip.file(filePath)?.async('uint8array');

                                        if (!foundFile) {
                                            console.error('Following file not found: ' + dat.name[0]._text);
                                            return;
                                        }

                                        const fileReader = new FileReader();
                                        fileReader.readAsArrayBuffer(new Blob([foundFile]));

                                        // write each file to local storage
                                        fileReader.onloadend = () => {
                                            const fileBuffer = new Uint8Array(fileReader.result as ArrayBuffer);
                                            window.fs.writeFile(`${newPath}/${datIntdex}_${dat.name[0]._text}`, fileBuffer, (error: Error) => {
                                                if (error) {
                                                    console.error(error);
                                                }
                                            });
                                        };
                                    });
                                });
                                alert(`Success: Es ${moreThanOneNode ? 'wurden' : 'wurde'} ${nodes.length} Ingest ${moreThanOneNode ? 'Pakete' : 'Paket'} gespeichert.`);
                            } catch (error) {
                                alert(error);
                            }
                        }
                    }));
                } else {
                    alert('Error: Der Speicherpfad muss leer sein, um die Dateien dort speichern zu können.');
                }
            }
        });
    }

    /**
     * convert xml to json (xml2json)
     */
    convert() {
        // reset error status
        this.converterError = false;

        // parse xml and return json
        this.sip = xmlToJSON.parseString(this.form.value['xml'], XML_OPTIONS);

        if (this.sip.paket && this.sip.paket.length) {
            // display json in the second textarea
            this.form.controls['json'].setValue(JSON.stringify(this.sip, undefined, 4));

            this.sip.paket[0].inhaltsverzeichnis[0].ordner.forEach(content => {
                // display folder structure of content
                if (content.name[0]._text !== 'header') {
                    this.dataSource.data = (content.ordner ? content.ordner : this.sip.paket[0].inhaltsverzeichnis[0].ordner);
                }
            });

            this.provenienz = this.sip.paket[0].ablieferung[0].provenienz[0];

        } else {
            // in case of an error: display the error message
            this.converterError = true;
            this.form.controls['json'].setValue('');
            this.error.message = (this.sip.html ? this.sip.html[0].body[0].parsererror[0].h3[0]._text + ' ' +
                this.sip.html[0].body[0].parsererror[0].div[0]._text : 'no error message');
        }
    }

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

    /**
     * read uploaded metadata.xml file and select it
     */
    private async _readCurrentMetadataXml(): Promise<void> {
        try {
            const zip = await this._getCurrentZipFile();
            const keys = Object.keys(zip.files);
            const metadataPath = keys.find(key => key.endsWith('header/metadata.xml')) ?? '';
            const metadataXML = await zip.file(metadataPath)?.async('string');

            this.form.controls['xml'].setValue(metadataXML);
            this.convert();
        } catch (error) {
            this.router.navigate(['/upload']);
            // todo: maybe just alert error instead of dialog?
            this.dialog.open(GenericDialogComponent, {
                data: { title: 'Fehler beim SIP', text: 'Das SIP konnte nicht geladen werden. Bitte laden Sie es erneut hoch.' },
                panelClass: 'simple-dialog'
            });
            // console.error(error);
        }
    }

    private async _getCurrentZipFile() {

        const tp = 'C:\\Windows\\Temp\\';
        const zipFileData = window.fs.readFileSync(tp + 'sip.zip');
        return JSZip.loadAsync(zipFileData);
    }
}
