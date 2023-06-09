import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface GenericDialogMessage {
    title: string;
    text: string;
    log?: string;
    showActions?: boolean;
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

    /**
     * close dialog and return false (cancelled)
     */
    cancelDialog(): void {
        this.dialogRef.close(false);
    }

    /**
     * close dialog and return true (approved)
     */
    approveDialog(): void {
        this.dialogRef.close(true);
    }
}
