import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GenericDialogComponent } from './generic-dialog.component';

describe('GenericDialogComponent', () => {
    let component: GenericDialogComponent;
    let fixture: ComponentFixture<GenericDialogComponent>;
    const data = { title: 'TestTitle', msg: 'TestMessage' };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GenericDialogComponent], imports: [
                MatDialogModule
            ],
            providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: data }]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GenericDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
