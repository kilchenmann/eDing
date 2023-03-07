import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ElectronService } from 'ngx-electron';
import {
    PackageExpansionPanelComponent
} from '../../components/package-expansion-panel/package-expansion-panel.component';
import { OrganizeComponent } from './organize.component';
import { AppModule } from '../../../../app.module';

describe('OrganizeComponent', () => {
    let component: OrganizeComponent;
    let fixture: ComponentFixture<OrganizeComponent>;
    const data = { title: 'TestTitle', msg: 'TestMessage' };

    const mockFs = {
        readFileSync: () => {
        }
    };
    Object.defineProperty(window, 'fs', { value: mockFs });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppModule],
            declarations: [
                OrganizeComponent,
                PackageExpansionPanelComponent
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: data },
                { provide: ElectronService, useValue: {} }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(OrganizeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        mockFs.readFileSync();
        expect(component).toBeTruthy();
    });
});
