import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from 'src/app/shared/generic-dialog/generic-dialog.component';
import { UploadService } from '../../services/upload.service';
import { FILE_DATA } from '../../../../shared/models/file-data';
import { Router } from '@angular/router';


@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent {
    currentFile?: File;

    fileData = FILE_DATA;

    constructor(private _dialog: MatDialog, private uploadService: UploadService, private router: Router) { };

    /**
     * upload a file and check if it's valid
     * @param event - file as event
     */
    async uploadFile(event: Event): Promise<void> {
        const target = event.target as HTMLInputElement;

        if (target.files && target.files.length) {
            const file: File = target.files[0];
            const fileData = await this.uploadService.validateFileAndCheckFormat(file);

            if (fileData) {
                const wasSaveSuccessful = await this.uploadService.saveFile(file);

                if (wasSaveSuccessful) {
                    this.fileData = fileData;
                    this.currentFile = file;
                } else {
                    // todo: maybe use electron alert instead
                    this._dialog.open(GenericDialogComponent, {
                        data: { title: 'Error', text: 'Fehler beim Speichern der Files. Bitte versuchen Sie es erneut.' }, panelClass: 'normal-dialog'
                    });
                }
            } else {
                // todo: maybe use electron alert instead
                this._dialog.open(GenericDialogComponent, {
                    data: { title: 'Error', text: 'Bitte laden Sie ein valides ZIP-File entsprechend dem eCH-0160 Standard hoch.' }, panelClass: 'normal-dialog'
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
     * route to organize page
     */
    next() {
        this.router.navigate(['/organize']);
    }

    /**
     * reset file to make a new upload possible
     */
    cancel() {
        this.currentFile = undefined;
    }
}
