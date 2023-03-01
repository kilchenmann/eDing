import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OrganizeComponent } from './organize.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { ElectronService } from 'ngx-electron';

describe('OrganizeComponent', () => {
    let component: OrganizeComponent;
    let fixture: ComponentFixture<OrganizeComponent>;
    const data = { title: 'TestTitle', msg: 'TestMessage' };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                OrganizeComponent
            ],
            imports: [
                BrowserAnimationsModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                MaterialModule
            ],
            providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: data }, { provide: ElectronService, useValue: {} }]
        })
            .compileComponents();

        fixture = TestBed.createComponent(OrganizeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
