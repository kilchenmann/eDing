import { Injectable } from '@angular/core';
import { SIP } from '../../../shared/models/xmlns/bar.admin.ch/arelda/sip-arelda-v4';
import * as unzipit from 'unzipit';
import { FILE_DATA } from '../../../shared/models/file-data';
import { FileService } from '../../../shared/services/file.service';
import { XML_OPTIONS } from '../../../shared/models/xml-options';


// xmlToJSON does not export itself as ES6/ECMA2015 module,
// it is loaded globally in scripts tag of angular.json,
// we still need to declare the namespace to make TypeScript compiler happy.
declare let xmlToJSON: any;

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    sip: SIP = {
        paket: []
    };

    constructor(private fileService: FileService) {
    }

    /**
     * validate file and check format
     * @param file - file which should be checked for it is validity
     * @returns a promise with the file data
     */
    async validateFileAndCheckFormat(file: File): Promise<typeof FILE_DATA | false> {
        const hasValidFileType = (file.type === 'application/zip' || file.type === 'application/x-zip-compressed') && file.name.split('.').pop() === 'zip';

        // check file type
        if (!hasValidFileType) {
            return new Promise((resolve) => {
                resolve(false);
            });
        } else {
            return new Promise((resolve, reject) => {
                const blob = new Blob([file]);
                const uploadedZip = unzipit.unzip(blob);

                // check for folder structure and xml file
                uploadedZip.then((zip) => {
                    const keys = Object.keys(zip.entries);
                    const hasContent = keys.some(key => key.endsWith('content/'));
                    const hasHeader = keys.some(key => key.endsWith('header/'));
                    const hasMetadata = keys.some(key => key.endsWith('header/metadata.xml'));
                    const metadataPath = keys.find(key => key.endsWith('header/metadata.xml')) ?? '';

                    if (!hasContent && !hasHeader && !hasMetadata) {
                        resolve(false);
                    }

                    // read metadata.xml and check for specific fields
                    uploadedZip.then((zip2) => zip2.entries[metadataPath].text())
                        .then((xmlFile) => xmlToJSON.parseString(xmlFile, XML_OPTIONS))
                        .then((value) => this.sip = value)
                        .then(async () => {
                            const paket = this.sip.paket[0];
                            const hasPaketTyp = paket.paketTyp && paket.paketTyp[0]?._text;
                            // todo: add additional required fields for validation if necessary
                            if (!hasPaketTyp) {
                                resolve(false);
                            }

                            // set important file data which will be displayed to the user
                            const fileData = {
                                type: paket.paketTyp[0]._text,
                                publisher: paket.ablieferung[0].ablieferndeStelle[0]._text,
                                version: paket._attrschemaVersion._value,
                            };
                            await this.fileService.setCurrentZipFile(await uploadedZip);
                            resolve(fileData);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }).catch((err) => {
                    reject(err);
                });
            });
        }
    }

    /**
     * save file to temporary folder
     * @param file - file which should be saved
     * @param tmpPath - temp path for used os
     * @returns - a promise with a boolean
     */
    async saveFile(file: File, tmpPath: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const writeStream = window.fs.createWriteStream(tmpPath);

            const reader = file.stream().getReader();
            const pump = () => {
                reader.read().then(({ done, value }) => {
                    if (done) {
                        writeStream.end();
                        resolve(true);
                        return;
                    }
                    writeStream.write(value, (error: Error) => {
                        if (error) {
                            reject(error);
                        } else {
                            pump();
                        }
                    });
                }).catch(reject);
            };
            pump();
        });
    }
}
