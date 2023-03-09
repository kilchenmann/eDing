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

    constructor(private _dialog: MatDialog, private uploadService: UploadService, private router: Router) {
    };

    /**
     * upload a file and check validity
     * @param event - event with file as a target
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
                        data: { title: 'Fehler beim Öffnen', text: 'Das ZIP-Paket konnte nicht richtig verarbeitet werden. Bitte versuchen Sie es erneut.' },
                        panelClass: 'simple-dialog'
                    });
                }
            } else {
                // todo: maybe use electron alert instead
                this._dialog.open(GenericDialogComponent, {
                    data: {
                        title: 'Fehler im Format',
                        text: 'Bitte laden Sie ein valides ZIP-File entsprechend dem eCH-0160 Standard hoch.'
                    }, panelClass: 'simple-dialog'
                });
            }
        } else {
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
     * route to organize path
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
