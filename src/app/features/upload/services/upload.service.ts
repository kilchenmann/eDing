import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { XML_OPTIONS } from '../../../shared/models/xml-options';
import { SIP } from '../../organize/models/xmlns/bar.admin.ch/arelda/sip-arelda-v4';
import { FILE_DATA } from '../../../shared/models/file-data';

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

    constructor() { }

    /**
     * validate file and check format
     * @param file - file which should be checked for it is validity
     * @returns a boolean promise
     */
    async validateFileAndCheckFormat(file: File): Promise<typeof FILE_DATA | false> {
        const hasValidFileType = file.type === 'application/zip' && file.name.split('.').pop() === 'zip';

        if (!hasValidFileType) {
            return new Promise((resolve) => {
                resolve(false);
            });
        } else {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = () => {
                    JSZip.loadAsync(file)
                        .then(zip => {
                            // check if the required folders & files exist
                            const keys = Object.keys(zip.files);
                            const hasContent = keys.some(key => key.endsWith('/content/'));
                            const hasHeader = keys.some(key => key.endsWith('/header/'));
                            const hasMetadata = keys.some(key => key.endsWith('/header/metadata.xml'));
                            const metadataPath = keys.find(key => key.endsWith('/header/metadata.xml')) ?? '';

                            if (!hasContent && !hasHeader && !hasMetadata) {
                                resolve(false);
                            }

                            // read metadata.xml file and check for specific fields
                            zip.files[metadataPath].async('text')
                                .then(xmlFile => xmlToJSON.parseString(xmlFile, XML_OPTIONS))
                                .then((value) => this.sip = value).then(() => {
                                    const paket = this.sip.paket[0];
                                    const hasPaketTyp = paket.paketTyp && paket.paketTyp[0]?._text;
                                    // todo: add additional required fields for validation if necessary
                                    if (!hasPaketTyp) {
                                        resolve(false);
                                    }

                                    // set important data which will be displayed to the user
                                    const fileData = {
                                        type: paket.paketTyp[0]._text,
                                        publisher: paket.ablieferung[0].ablieferndeStelle[0]._text,
                                        version: paket._attrschemaVersion._value
                                    };
                                    resolve(fileData);
                                }).catch(err => {
                                    reject(err);
                                });
                        })
                        .catch(err => {
                            reject(err);
                        });
                };
                reader.readAsArrayBuffer(file);
            });
        }
    }

    /**
     * save file to temporary folder
     * @param file - file which should be saved
     * @notes - it's currently only working with electron app
     */
    async saveFile(file: File): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);

            // todo: currently each download is overwriting the old zip-file
            reader.onloadend = function () {
                const buffer = new Uint8Array(reader.result as ArrayBuffer);
                window.fs.writeFile(
                    'temp.zip',
                    buffer,
                    (error: Error) =>
                        error ? reject(error) : resolve(true)
                );
            };
        });
    }
}
