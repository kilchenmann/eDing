import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElectronService } from 'ngx-electron';
import { AppModule } from '../../../../app.module';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
    let component: FileUploadComponent;
    let fixture: ComponentFixture<FileUploadComponent>;

    const mockFs = {
        readFileSync: () => {
        }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppModule],
            declarations: [
                FileUploadComponent
            ],
            providers: [
                { provide: ElectronService, useValue: {} }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(FileUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        mockFs.readFileSync();
        expect(component).toBeTruthy();
    });
});
