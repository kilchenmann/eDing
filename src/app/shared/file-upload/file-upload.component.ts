import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';
import * as JSZip from 'jszip';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent {
    currentFile?: File;

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
     * validate file and check format
     * @param file - file which should be checked for it's validity
     * @returns a boolean promise
     */
    private async _validateFileAndCheckFormat(file: File): Promise<boolean> {
        const hasValidFileType = file.type === 'application/zip' && file.name.split('.').pop() !== 'zip';
        if (hasValidFileType) {
            return new Promise((resolve) => {
                resolve(false);
            });
        } else {
            const fileNameWithoutType = file.name.slice(0, file.name.lastIndexOf('.'));;
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (e: any) => {
                    const buffer = e.target.result;
                    JSZip.loadAsync(buffer)
                        .then(zip => {
                            const hasContent = !!zip.files[fileNameWithoutType + '/content/'];
                            const hasHeader = !!zip.files[fileNameWithoutType + '/header/'];
                            const hasMetadata = !!zip.files[fileNameWithoutType + '/header/metadata.xml'];
                            resolve(hasContent && hasHeader && hasMetadata);
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
