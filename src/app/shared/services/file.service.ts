import { Injectable } from '@angular/core';
import * as unzipit from 'unzipit';
import { ZipInfo } from 'unzipit';
import { ElectronService } from 'ngx-electron';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    currentZipFile: ZipInfo | undefined = undefined;

    constructor(private electronService: ElectronService) {
    }

    async getCurrentZipFile() {
        if (!this.currentZipFile) {
            const tmpPath = await this.electronService.ipcRenderer.invoke('get-temp-path');
            const stream = window.fs.createReadStream(tmpPath);
            const chunks: Blob[] = [];

            await new Promise<void>((resolve, reject) => {
                stream.on('data', (chunk: any) => chunks.push(chunk));
                stream.on('error', reject);
                stream.on('end', resolve);
            });
            const blob = new Blob(chunks);
            this.currentZipFile = await unzipit.unzip(blob);
        }

        return this.currentZipFile;
    }

    async setCurrentZipFile(zip: ZipInfo) {
        this.currentZipFile = zip;
    }
}
