import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';
import * as JSZip from 'jszip';
import { SIP } from '@av-dimag/ingest';
import { XML_OPTIONS } from '../models/xml-options';

// xmlToJSON does not export itself as ES6/ECMA2015 module,
// it is loaded globally in scripts tag of angular.json,
// we still need to declare the namespace to make TypeScript compiler happy.
declare let xmlToJSON: any;

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent {
    currentFile?: File;

    fileData = {
        type: '',
        publisher: '',
        version: -1
    };

    sip: SIP = {
        paket: []
    };

    constructor(private _dialog: MatDialog) { };

    /**
     * upload a file and check if it's valid
     * @param event - file as event
     */
    async uploadFile(event: Event): Promise<void> {
        const target = event.target as HTMLInputElement;

        if (target.files && target.files.length) {
            const file: File = target.files[0];
            const isFileValid = await this._validateFileAndCheckFormat(file);

            if (isFileValid) {
                const wasSaveSuccessful = await this._saveFile(file);

                if (wasSaveSuccessful) {
                    this.currentFile = file;
                } else {
                    this._dialog.open(GenericDialogComponent, {
                        data: { title: 'Error', text: 'Fehler beim Speichern des Files. Bitte versuchen Sie es erneut.' }, panelClass: 'error-dialog'
                    });
                }
            } else {
                this._dialog.open(GenericDialogComponent, {
                    data: { title: 'Error', text: 'Bitte laden Sie ein valides ZIP-File entsprechend dem eCH-0160 Standard hoch.' }, panelClass: 'error-dialog'
                });
            }
        } else {
            // throw error if file selection fails
            throw new Error('Error: Could not select file');
        }
    }

    /**
     * reset file input to make another upload possible
     * @param event - click or drop event
     */
    resetFileInput = (event: Event) => {
        (event.target as HTMLInputElement).value = '';
    };


    /**
     *
     */
    next() {
        // todo: implement logic when 'weiter' is clicked
        console.log('Weiter geklickt');
    }

    /**
     *
     */
    cancel() {
        this.currentFile = undefined;
    }

    /**
     * validate file and check format
     * @param file - file which should be checked for it's validity
     * @returns a boolean promise
     */
    private async _validateFileAndCheckFormat(file: File): Promise<boolean> {
        const hasValidFileType = file.type === 'application/zip' && file.name.split('.').pop() === 'zip';

        if (!hasValidFileType) {
            return new Promise((resolve) => {
                resolve(false);
            });
        } else {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (e: any) => {
                    JSZip.loadAsync(file)
                        .then(zip => {
                            // check if the required folders & files exist
                            const keys = Object.keys(zip.files);
                            const hasContent = keys.some(key => key.endsWith('/content/'));
                            const hasHeader = keys.some(key => key.endsWith('/header/'));
                            const hasMetadata = keys.some(key => key.endsWith('/header/metadata.xml'));
                            const metadataPath = keys.find(key => key.endsWith('/header/metadata.xml')) ?? '';

                            if (!hasContent && !hasHeader && !hasMetadata) {
                                resolve(false);
                            }

                            // read metadata.xml file and check for specific fields
                            zip.files[metadataPath].async('text')
                                .then(xmlFile => xmlToJSON.parseString(xmlFile, XML_OPTIONS))
                                .then((value) => this.sip = value).then(() => {
                                    const paket = this.sip.paket[0];
                                    const hasPaketTyp = paket.paketTyp && paket.paketTyp[0]?._text;
                                    // todo: add additional required fields for validation if neccessary
                                    const hasRequiredMetadata = hasPaketTyp;

                                    if (!hasRequiredMetadata) {
                                        resolve(false);
                                    }

                                    // set important data which will be displayed to the user
                                    this.fileData = {
                                        type: paket.paketTyp[0]._text,
                                        publisher: paket.ablieferung[0].ablieferndeStelle[0]._text,
                                        version: paket._attrschemaVersion._value
                                    };
                                    resolve(true);
                                }).catch(err => {
                                    reject(err);
                                });
                        })
                        .catch(err => {
                            reject(err);
                        });
                };
                reader.readAsArrayBuffer(file);
            });
        }
    }

    /**
     * save file to temporary folder
     * @param file - file which should be saved
     * @notes - it's currently only working with electron app
     */
    private async _saveFile(file: File): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);

            // todo: currently each download is overwriting the old zip-file
            reader.onloadend = function () {
                const buffer = new Uint8Array(reader.result as ArrayBuffer);
                window.fs.writeFile(
                    'temp',
                    buffer,
                    (error: Error) =>
                        error ? reject(error) : resolve(true)
                );
            };
        });
    }
}
