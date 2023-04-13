import { TestBed } from '@angular/core/testing';
import { ElectronService } from 'ngx-electron';

import { UploadService } from './upload.service';

describe('UploadService', () => {
    let service: UploadService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ElectronService]
        });
        service = TestBed.inject(UploadService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
