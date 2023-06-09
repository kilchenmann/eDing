import { Injectable } from '@angular/core';
import { isEqualWith } from 'lodash-es';
import {
    Datum,
    Dokument,
    Dossier,
    Merkmal,
    Ordner,
    Ordnungssystem,
    Ordnungssystemposition,
    Provenienz,
    TextString,
    ValueString,
    Zeitraum,
    ZusatzDaten
} from '../../../shared/models/xmlns/bar.admin.ch/arelda/sip-arelda-v4';

@Injectable({
    providedIn: 'root'
})
export class OrganizeService {
    getOsp(ordnungssystemposition: Ordnungssystemposition[], dateiRef: string) {
        const result: { osp?: Ordnungssystemposition; dos?: Dossier; dok?: Dokument } = {};
        this.findOsp(ordnungssystemposition, dateiRef, result);
        return result;
    }

    /**
     * compare if two ingest packages are equal
     * @param firstPackage - first package for comparing
     * @param secondPackage - second package for comparing
     * @notes path is dependent on the package creation method therefore it gets ignored
     */
    comparePackages(firstPackage: Ordner, secondPackage: Ordner) {
        return isEqualWith(firstPackage, secondPackage, (value1, value2, key) =>
            key === 'path' ? true : undefined
        );
    }

    /**
     * todo: describe function
     * @param root
     * @param data
     * @param file
     */
    createEle(root: string, data: Object, file?: string): HTMLElement {
        const xml = document.implementation.createDocument('', '', null);

        const rootEle = xml.createElement(root);
        Object.entries(data).forEach(([key, value], index) => {
            // check if key is of attribute type
            const attr = key.split('_attr');
            if (attr.length > 1) {
                // switch in case of an object
                rootEle.setAttribute(attr[1],  (value._value ? JSON.stringify(value._value) : 'undefined'));

            } else {
                let ele = xml.createElement(key);

                // todo: check type
                if (key === 'dateiRef' && file) {
                    // use filename as datei reference instead of original dateiRef name.
                    // because in the ingest tool, we know the filename only
                    ele.innerHTML = file;
                } else {

                    let stringified = '';

                    if (value === undefined) {
                        console.warn('Warning! This value is undefined or the element does not exist: ' + JSON.stringify(value));
                    } else {
                        // which kind of value do we have?
                        // switch in case of an array
                        if (Array.isArray(value)) {
                            switch (true) {
                                case this.instanceOfTS(value[0]):
                                    // instance of TextString
                                    let t = 0;
                                    for (const val of <TextString[]>value) {
                                        const delimiter = (t > 0 ? '<br/>' : '');
                                        stringified += delimiter + val._text;
                                        t++;
                                    }
                                    ele.innerHTML = stringified;
                                    break;

                                case this.instanceOfZD(value[0]):
                                    // instance of ZusatzDaten
                                    let z = 0;
                                    for (const val of <ZusatzDaten[]>value) {
                                        const delimiter = (z > 0 ? '<br/>' : '');
                                        for (const m of <Merkmal[]>val.merkmal) {
                                            stringified += delimiter + m._attrname._value + ' ' + m._text;
                                        }
                                        z++;
                                    }
                                    ele.innerHTML = stringified;
                                    break;


                                case this.instanceOfDM(value[0]):
                                    // instance of Datum
                                    let d = 0;
                                    for (const val of <Datum[]>value) {

                                        if (val.ca && val.ca[d]._text) {
                                            const ca = xml.createElement('ca');
                                            ca.innerHTML = 'true';
                                            ele.appendChild(ca);
                                        }
                                        const datum = xml.createElement('datum');
                                        datum.innerHTML = val.datum[d]._text;
                                        ele.appendChild(datum);

                                        d++;
                                    }

                                    break;

                                case this.instanceOfZR(value[0]):
                                    // instance of Zeitraum
                                    let p = 0;
                                    for (const val of <Zeitraum[]>value) {

                                        const von = xml.createElement('von');
                                        if (val.von[0].ca && val.von[0].ca[0]._text) {
                                            const ca = xml.createElement('ca');
                                            ca.innerHTML = 'true';
                                            von.appendChild(ca);
                                        }

                                        const datumVon = xml.createElement('datum');
                                        datumVon.innerHTML = val.von[0].datum[0]._text;
                                        von.appendChild(datumVon);
                                        ele.appendChild(von);

                                        const bis = xml.createElement('bis');
                                        if (val.bis[0].ca && val.bis[0].ca[0]._text) {
                                            const ca = xml.createElement('ca');
                                            ca.innerHTML = 'true';
                                            bis.appendChild(ca);
                                        }

                                        const datumBis = xml.createElement('datum');
                                        datumBis.innerHTML = val.bis[0].datum[0]._text;
                                        bis.appendChild(datumBis);
                                        ele.appendChild(bis);

                                        p++;
                                    }
                                    break;

                                case this.instanceOfPR(value[0]):
                                    // instance of Provenienz
                                    ele = this.createEle('provenienz', value[0]);
                                    break;

                                case this.instanceOfOS(value[0]):
                                    // instance of Ordnungssystem
                                    ele = this.createEle('ordnungssystem', value[0]);
                                    break;

                                case this.instanceOfOSP(value[0]):
                                    // instance of Ordnungssystemposition
                                    // skip!!!
                                    break;

                                case (value[0] && value[0]._text && value[0]._text[0] === null):
                                    // something is empty in xml, skip
                                    break;

                                default:
                                    console.warn('Warning! This object type (array) is not yet supported!');
                            }
                        } else {
                            // switch in case of an object
                            ele.innerHTML = (value._value ? JSON.stringify(value._value) : 'undefined');
                        }
                    }
                }

                if (ele.hasChildNodes()) {
                    rootEle.appendChild(ele);
                }
            }
        });
        return rootEle;
    }

    // https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript
    instanceOfTS(object: any): object is TextString {
        const keys = Object.keys(object);
        const key = keys[0];
        return (keys.length === 1 && key === '_text');
    }

    instanceOfVS(object: any): object is ValueString {
        const keys = Object.keys(object);
        const key = keys[0];
        return (keys.length === 1 && key === '_value');
    }

    instanceOfDM(object: any): object is Datum {
        return 'datum' in object;
    }

    instanceOfZR(object: any): object is Zeitraum {
        return 'von' in object || 'bis' in object;
    }

    instanceOfZD(object: any): object is ZusatzDaten {
        return 'merkmal' in object;
    }

    instanceOfPR(object: any): object is Provenienz {
        // return 'aktenbildnerName' in object || 'registratur' in object || 'systemName' in object;
        const keys = Object.keys(object);
        const key = keys[0];
        return (keys.length > 1 && (key === 'aktenbildnerName' || key === 'registratur' || key === 'systemName'));
    }

    instanceOfOS(object: any): object is Ordnungssystem {
        return 'ordnungssystemposition' in object && 'generation' in object;
    }

    instanceOfOSP(object: any): object is Ordnungssystemposition {
        return 'dossier' in object || 'nummer' in object;
    }

    instanceOfDOS(object: any): object is Dossier {
        return 'dossier' in object || 'nummer' in object;
    }

    /**
     * geht durch die "ordnungssystemposition"-Hierarchie
     * @param ordnungssystemposition
     * @param dateiRef
     * @param result
     */
    private findOsp(ordnungssystemposition: Ordnungssystemposition[], dateiRef: string, result: { osp?: Ordnungssystemposition; dos?: Dossier; dok?: Dokument }) {
        ordnungssystemposition.forEach(
            (osp: Ordnungssystemposition) => {
                if (osp.ordnungssystemposition && osp.ordnungssystemposition.length > 0) {
                    this.findOsp(osp.ordnungssystemposition, dateiRef, result);
                }
                if (osp.dossier && osp.dossier.length > 0) {
                    this.findDos(osp.dossier, dateiRef, osp, result);
                }
            }
        );
    }

    /**
     * geht durch die "Dossier"-Hierarchie
     * @param dossier
     * @param dateiRef
     * @param osp
     * @param result
     * @private
     */
    private findDos(dossier: Dossier[], dateiRef: string, osp: Ordnungssystemposition, result: { osp?: Ordnungssystemposition; dos?: Dossier; dok?: Dokument }) {
        dossier.forEach(
            (dos: Dossier) => {
                if (dos.dossier && dos.dossier.length > 0) {
                    this.findDos(dos.dossier, dateiRef, osp, result);
                }
                if (dos.dokument && dos.dokument.length > 0) {
                    dos.dokument.forEach(
                        (dok: Dokument) => {
                            if (dok.dateiRef && dok.dateiRef.length) {
                                const index = dok.dateiRef.findIndex(ref => ref._text === dateiRef);
                                if (index > -1) {
                                    result.dok = dok;
                                    result.dos = dos;
                                    result.osp = osp;
                                }
                            }
                        }
                    );

                } else if (dos.dateiRef && dos.dateiRef.length) {
                    const index = dos.dateiRef.findIndex(ref => ref._text === dateiRef);
                    if (index > -1) {
                        result.dos = dos;
                        result.osp = osp;
                        return;
                    }
                }
            }
        );
    }
}
