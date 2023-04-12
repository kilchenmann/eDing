import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ElectronService } from 'ngx-electron';
import { AppModule } from '../../../../app.module';
import {
    PackageExpansionPanelComponent
} from '../../components/package-expansion-panel/package-expansion-panel.component';
import { OrganizeComponent } from './organize.component';

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
