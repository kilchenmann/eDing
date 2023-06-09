import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { ElectronService } from 'ngx-electron';
import { Subscription } from 'rxjs';
import { GenericDialogComponent } from '../../../../shared/generic-dialog/generic-dialog.component';
import { ErrorMessage } from '../../../../shared/models/error-message';
import { XML_OPTIONS } from '../../../../shared/models/xml-options';
import {
    Datei,
    Dokument,
    Dossier,
    Ordner,
    Ordnungssystemposition,
    Provenienz,
    SIP
} from '../../../../shared/models/xmlns/bar.admin.ch/arelda/sip-arelda-v4';
import { OrganizeService } from '../../services/organize.service';
import packageInfo from '../../../../../../package.json';
import { FileService } from '../../../../shared/services/file.service';


// xmlToJSON does not export itself as ES6/ECMA2015 module,
// it is loaded globally in scripts tag of angular.json,
// we still need to declare the namespace to make TypeScript compiler happy.
declare let xmlToJSON: any;

@Component({
    selector: 'app-organize',
    templateUrl: './organize.component.html',
    styleUrls: ['./organize.component.scss']
})
export class OrganizeComponent implements OnInit, OnDestroy {
    sip: SIP = {
        paket: []
    };
    xml = '';
    json = '';

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

    ingestPackages: Ordner[] = [];

    addFilesFromSubfolders = true;

    alreadyAddedIngestPackages: { ingestPackage: Ordner; addFilesFromSubfolders: boolean }[] = [];

    subContainer = new Subscription;

    loading = true;

    constructor(
        private dialog: MatDialog,
        private electronService: ElectronService,
        private organizeService: OrganizeService,
        private router: Router,
        private titleService: Title,
        private fileService: FileService
    ) {
    }

    ngOnInit() {
        this.readCurrentMetadataXml();

        // store ingestPackages before window close
        window.addEventListener('beforeunload', async () => {
            window.localStorage.setItem('ingestPackages', JSON.stringify(this.ingestPackages));
            window.localStorage.setItem('addedIngestPackages', JSON.stringify(this.alreadyAddedIngestPackages));
        });

        // get stored project name
        const projectName = window.localStorage.getItem('currentProject');
        if (projectName) {
            this.titleService.setTitle(`${packageInfo.name} > ${projectName}`);
        }

        // get stored ingestPackages
        const storedIngestPackages = window.localStorage.getItem('ingestPackages');
        if (storedIngestPackages) {
            this.ingestPackages = JSON.parse(storedIngestPackages);
        }

        // get stored addedIngestPackages
        const storedAddedIngestPackages = window.localStorage.getItem('addedIngestPackages');
        if (storedAddedIngestPackages) {
            this.alreadyAddedIngestPackages = JSON.parse(storedAddedIngestPackages);
        }
    }

    ngOnDestroy() {
        // store ingestPackages
        window.localStorage.setItem('ingestPackages', JSON.stringify(this.ingestPackages));
        window.localStorage.setItem('addedIngestPackages', JSON.stringify(this.alreadyAddedIngestPackages));
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

        function processNode(node: Ordner, filePath: string, addFilesFromSubfolder: boolean) {
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
                    processNode(ordner, filePath, addFilesFromSubfolder);
                });
            }
        }

        processNode(packageCopy, '', this.addFilesFromSubfolders);

        // check if package already exists and if not add it to array
        if (!this.ingestPackages.find((existingPackage) => this.organizeService.comparePackages(existingPackage, packageCopy))) {
            this.ingestPackages.unshift(packageCopy);
            this.alreadyAddedIngestPackages.unshift({
                ingestPackage,
                addFilesFromSubfolders: this.addFilesFromSubfolders
            });
        } else {
            const dialogRef = this.dialog.open(GenericDialogComponent, {
                data: {
                    title: 'Fehler beim Paketieren',
                    text: 'Diese Struktur wurde bereits einem Ingest Paket hinzugefügt.',
                    showActions: false
                }, panelClass: 'simple-dialog'
            });
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

                // save path for each file
                if (packageCopy.datei && packageCopy.datei.length > 0) {
                    packageCopy.datei.forEach((file) => {
                        file.path = { _value: filePath + file.name[0]._text };
                    });

                    // check if package already exists and if not add it to array
                    if (!this.ingestPackages.find((existingPackage) => this.organizeService.comparePackages(existingPackage, packageCopy))) {
                        this.ingestPackages.push(packageCopy);
                        this.alreadyAddedIngestPackages.push({
                            ingestPackage,
                            addFilesFromSubfolders: false
                        });
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
            this.dialog.open(GenericDialogComponent, {
                data: {
                    title: 'Fehler beim Paketieren',
                    text: 'Ein oder mehrere Paket/e konnten nicht erstellt werden, da sie bereits einem Ingest Paket hinzugefügt wurden.'
                },
                panelClass: 'simple-dialog'
            });
        }
    }

    /**
     * remove ingest package
     * @param ingestPackage: ingest package which should get removed
     */
    removeIngestPackage(ingestPackage: Ordner) {
        const packageIndex = this.ingestPackages.findIndex(existingPackage => this.organizeService.comparePackages(existingPackage, ingestPackage));

        if (packageIndex >= 0) {
            this.ingestPackages.splice(packageIndex, 1);
            this.alreadyAddedIngestPackages.splice(packageIndex, 1);
        } else {
            this.dialog.open(GenericDialogComponent, {
                data: {
                    title: 'Fehler beim Löschen',
                    text: 'Das Paket konnte nicht gelöscht werden.'
                },
                panelClass: 'simple-dialog'
            });
        }
    }

    /**
     * remove all ingest packages through setting an empty array
     */
    removeAllIngestPackage() {
        this.ingestPackages = [];
        this.alreadyAddedIngestPackages = [];
    }

    async exportIngestPackages(ingestPackages: Ordner[]) {
        this.electronService.ipcRenderer.invoke('show-save-dialog').then((path: string) => {
            if (path) {
                // check if chosen folder is empty
                const isChosenFolderEmpty = window.fs.readdirSync(path).length === 0 || window.fs.readdirSync(path).length === 1 && window.fs.readdirSync(path)[0] === '.DS_Store';

                if (isChosenFolderEmpty) {
                    const moreThanOneIngestPackage = (ingestPackages.length > 1);
                    // show dialog to user
                    const dialogRef = this.dialog.open(GenericDialogComponent, {
                        data: {
                            title: 'Ingest Pakete Exportieren',
                            text: `Es ${moreThanOneIngestPackage ? 'werden' : 'wird'} ${ingestPackages.length} Ingest
                            ${moreThanOneIngestPackage ? 'Pakete' : 'Paket'} gespeichert. Wollen Sie fortfahren?`,
                            showActions: true
                        }, panelClass: 'simple-dialog'
                    });

                    this.subContainer.add(dialogRef.afterClosed().subscribe(async (result) => {
                        if (result) {
                            try {
                                // todo: add loading spinner while wating for files to be saved (ps: not working here with await)
                                await this.savePackagesToFileSystem(ingestPackages, path, moreThanOneIngestPackage);
                                this.dialog.open(GenericDialogComponent, {
                                    data: {
                                        title: 'Exportieren war erfolgreich',
                                        text: `Es ${moreThanOneIngestPackage ? 'wurden' : 'wurde'} ${ingestPackages.length} Ingest ${moreThanOneIngestPackage ? 'Pakete' : 'Paket'} gespeichert.`
                                    },
                                    panelClass: 'simple-dialog'
                                });
                            } catch (error) {
                                this.dialog.open(GenericDialogComponent, {
                                    data: {
                                        title: 'Fehler beim Exportieren',
                                        text: 'Da ging etwas schief. Bitte folgende Fehlermeldung bachten:',
                                        log: error
                                    },
                                    panelClass: 'simple-dialog'
                                });
                            }
                        }
                    }));
                } else {
                    this.dialog.open(GenericDialogComponent, {
                        data: {
                            title: 'Fehler im Speicherpfad',
                            text: 'Der Pfad / Ordner muss leer sein, um die Dateien dort speichern zu können. Bitte wählen Sie einen anderen Pfad aus.'
                        },
                        panelClass: 'simple-dialog'
                    });
                }
            }
        });
    }

    /**
     * export / save ingest packages to filesystem
     * @param ingestPackages - nodes / ingestPackages to export/save
     * @param path
     * @param moreThanOneIngestPackage
     */
    async savePackagesToFileSystem(ingestPackages: Ordner[], path: string, moreThanOneIngestPackage: boolean) {
        const zip = await this.fileService.getCurrentZipFile();
        const keys = Object.keys(zip.entries);

        ingestPackages.forEach((ingestPackage, index) => {
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
            name.innerHTML = ingestPackage.name[0]._text;
            ordner.appendChild(name);

            const originalName = xmlDos.createElement('originalName');
            if (ingestPackage.originalName) {
                originalName.innerHTML = ingestPackage.originalName[0]?._text;
            }
            ordner.appendChild(originalName);

            ingestPackage.datei?.forEach(
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
            ingestPackage.datei?.forEach(
                (dat: Datei) => {
                    this.getFileMetadata(dat._attrid._value);

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

            const comment = xmlDos.createComment(
                ` ${new Date().toLocaleString('de-CH')} | Automatically generated with ${packageInfo.name} (v${packageInfo.version}) by AV DIMAG (CH) `
            );
            xmlDos.appendChild(comment);

            const serializer = new XMLSerializer();
            const xmlString = `<?xml version="1.0" encoding="UTF-8"?> ${serializer.serializeToString(xmlDos)}`;

            const xmlFile = new Blob([xmlString], { type: 'application/xml' });
            const xmlReader = new FileReader();
            const newPath = `${path}/${ingestPackage.name[0]._text}_${index}`;
            xmlReader.readAsArrayBuffer(xmlFile);

            xmlReader.onloadend = function () {
                const xmlBuffer = new Uint8Array(xmlReader.result as ArrayBuffer);
                window.fs.mkdirSync(newPath);
                window.fs.writeFile(
                    `${newPath}/metadata.xml`,
                    xmlBuffer, (error: Error) => {
                        if (error) {
                            // this.dialog can´t be used here
                            console.error(error);
                        }
                    });
            };

            ingestPackage.datei?.forEach(async (dat, datIndex) => {
                // get binary data for the file from the uploaded zip-file
                const filePath = keys.find(key => key.endsWith(dat.path._value)) ?? '';

                const foundFile = await zip.entries[filePath]?.blob();

                if (!foundFile) {
                    this.dialog.open(GenericDialogComponent, {
                        data: {
                            title: 'Fehler beim Exportieren',
                            text: `Die folgende Datei konnte nicht gefunden werden: ${dat.name[0]._text}`
                        },
                        panelClass: 'simple-dialog'
                    });
                    return;
                }

                const fileReader = new FileReader();
                fileReader.readAsArrayBuffer(new Blob([foundFile]));

                // write each file to local storage
                fileReader.onloadend = async () => {
                    const fileBuffer = new Uint8Array(fileReader.result as ArrayBuffer);
                    await window.fs.writeFile(`${newPath}/${datIndex}_${dat.name[0]._text}`, fileBuffer, (error: Error) => {
                        if (error) {
                            this.dialog.open(GenericDialogComponent, {
                                data: {
                                    title: 'Fehler beim Exportieren',
                                    text: 'Da ging etwas schief. Bitte folgende Fehlermeldung bachten:',
                                    log: error
                                },
                                panelClass: 'simple-dialog'
                            });
                        }
                    });
                };
            });
        });
    }


    /**
     * convert xml to json (xml2json)
     */
    convertXmlToJson() {
        // reset error status
        this.converterError = false;

        // parse xml and return json
        this.sip = xmlToJSON.parseString(this.xml, XML_OPTIONS);

        if (this.sip.paket && this.sip.paket.length) {
            // display json in the second textarea
            this.json = JSON.stringify(this.sip, undefined, 4);

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
            this.json = '';
            this.error.message = (this.sip.html ? this.sip.html[0].body[0].parsererror[0].h3[0]._text + ' ' +
                this.sip.html[0].body[0].parsererror[0].div[0]._text : 'no error message');
        }
    }

    /**
     * gets file metadata
     * @param dateiRef
     */
    getFileMetadata(dateiRef: string) {
        const result = this.organizeService.getOsp(this.sip.paket[0].ablieferung[0].ordnungssystem[0].ordnungssystemposition, dateiRef);
        this.dos = result.dos;
        this.osp = result.osp;
        this.dok = result.dok;
    }

    /**
     * read uploaded metadata.xml file and select it
     */
    private async readCurrentMetadataXml(): Promise<void> {
        try {
            const zip = await this.fileService.getCurrentZipFile();
            this.loading = false;
            const keys = Object.keys(zip.entries);
            const metadataPath = keys.find(key => key.endsWith('header/metadata.xml')) ?? '';
            const metadataXML = await zip.entries[metadataPath].text();
            this.xml = metadataXML ?? '';
            this.convertXmlToJson();
        } catch (error) {
            await this.router.navigate(['/']);
            this.dialog.open(GenericDialogComponent, {
                data: {
                    title: 'SIP nicht vorhanden',
                    text: 'Das SIP konnte nicht geladen werden. Bitte laden Sie es erneut hoch.',
                    log: error
                },
                panelClass: 'simple-dialog'
            });
        }
    }
}
