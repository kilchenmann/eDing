import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import { GenericDialogComponent } from './generic-dialog.component';

describe('GenericDialogComponent', () => {
    let component: GenericDialogComponent;
    let fixture: ComponentFixture<GenericDialogComponent>;
    const data = { title: 'TestTitle', msg: 'TestMessage' };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                GenericDialogComponent
            ],
            imports: [
                MatButtonModule,
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
