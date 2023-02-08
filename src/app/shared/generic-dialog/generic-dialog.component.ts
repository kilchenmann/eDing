import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface GenericDialogMessage {
    title: string;
    text: string;
    log?: string;
};

@Component({
    selector: 'app-generic-dialog',
    templateUrl: './generic-dialog.component.html',
    styleUrls: ['./generic-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class GenericDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<GenericDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public msg: GenericDialogMessage) { }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
