import { Pipe, PipeTransform } from '@angular/core';
import {
    Datum,
    Merkmal,
    TextNumber,
    TextString,
    Zeitraum,
    ZusatzDaten
} from '../models/xmlns/bar.admin.ch/arelda/sip-arelda-v4';
import { OrganizeService } from '../services/organize.service';

@Pipe({
    name: 'stringifyValue'
})
export class StringifyValuePipe implements PipeTransform {

    constructor(private organizeService: OrganizeService) {
    }

    transform(value: any): string {
        let stringified = '';

        if (value === undefined) {
            return '<i class="warning">Warning! This value is undefined or the element does not exist.</i>' + JSON.stringify(value);
        } else {
            // which kind of value do we have?
            // switch in case of an array
            if (Array.isArray(value)) {
                switch (true) {
                    case this.organizeService.instanceOfTS(value[0]):
                        // instance of TextString
                        let t = 0;
                        for (const val of <TextString[]>value) {
                            const delimiter = (t > 0 ? '<br>' : '');
                            stringified += delimiter + val._text;
                            t++;
                        }
                        return stringified;

                    case this.organizeService.instanceOfTN(value[0]):
                        // instance of TextNumber
                        let i = 0;
                        for (const val of <TextNumber[]>value) {
                            const delimiter = (i > 0 ? '<br>' : '');
                            stringified += delimiter + val._text;
                            i++;
                        }
                        return stringified;

                    case this.organizeService.instanceOfTB(value[0]):
                        // instance of TextBoolean
                        // wir gehen davon aus, dass der boolsche Wert nur einmal vorkommt,
                        // auch wenn der Wert als Array zurückkommt. Deshalb wird lediglich
                        // der erste Wert zurückgegeben.
                        return (value[0]._text === 'true' ? 'ja' : 'nein');

                    case this.organizeService.instanceOfZD(value[0]):
                        // instance of ZusatzDaten
                        let z = 0;
                        for (const val of <ZusatzDaten[]>value) {
                            const delimiter = (z > 0 ? '</br>' : '');
                            for (const m of <Merkmal[]>val.merkmal) {
                                stringified += delimiter + m._attrname._value + ' ' + m._text;
                            }
                            z++;
                        }
                        return stringified;


                    case this.organizeService.instanceOfDM(value[0]):
                        // instance of Datum
                        let d = 0;
                        for (const val of <Datum[]>value) {
                            const delimiter = (d > 0 ? '</br>' : '');
                            stringified += delimiter + this._setDate(val);
                            d++;
                        }
                        return stringified;


                    case this.organizeService.instanceOfZR(value[0]):
                        // instance of Zeitraum
                        let p = 0;
                        for (const val of <Zeitraum[]>value) {
                            const delimiter = (p > 0 ? '</br>' : '');
                            stringified += delimiter + this._setDate(val.von[0]) + ' - ' + this._setDate(val.bis[0]);
                            p++;
                        }
                        return stringified;

                    default:
                        return '<i class="warning">Warning! This object type is not yet supported: </i>' + JSON.stringify(value[0]);
                }

            } else {
                // switch in case of an object
                switch (true) {
                    case (this.organizeService.instanceOfVS(value)):
                        return (value._value ? value._value : 'undefined');

                    case (this.organizeService.instanceOfVN(value)):
                        return JSON.stringify(value._value);

                    default:
                        return '<i class="warning">Warning! This object type is not yet supported: </i>' + JSON.stringify(value);
                }
            }
        }
    }


    private _parseDate(val: string): string {
        // the format could be: 2022-11-31 OR 2022-11 OR 2022
        const m = val.toString().split('-');

        let date = '';

        if (m.length === 3) {
            date = m[2] + '.' + m[1] + '.' + m[0];
        } else if (m.length === 2) {
            date = m[1] + '. ' + m[0];
        } else if (m.length === 1) {
            date = m[0];
        }

        return date;

    }

    private _setDate(date: Datum): string {
        const ca = ((date.ca && date.ca[0]._text) ? 'ca. ' : '');
        return ca + this._parseDate(date.datum[0]._text);
    }
}
