import { Pipe, PipeTransform } from '@angular/core';
import {
    Datum,
    Merkmal,
    TextString,
    Zeitraum,
    ZusatzDaten
} from '../../../shared/models/xmlns/bar.admin.ch/arelda/sip-arelda-v4';
import { OrganizeService } from '../services/organize.service';
import { isArray } from 'lodash-es';

@Pipe({
    name: 'stringifyValue'
})
export class StringifyValuePipe implements PipeTransform {

    constructor(private organizeService: OrganizeService) {
    }

    transform(value: any): string {
        let stringified = '';

        if (value === undefined) {
            return '--';
        } else {
            // which kind of value do we have?
            // switch in case of an array
            if (Array.isArray(value)) {
                switch (true) {
                    case this.organizeService.instanceOfTS(value[0]):
                        // instance of TextString
                        let t = 0;
                        for (const val of <TextString[]>value) {
                            if (!isArray(val._text)) {
                                const delimiter = (t > 0 ? '<br>' : '');

                                const strVal = ((val._text === 'true' || val._text === 'false') ? (val._text === ('true' ) ? 'ja' : 'nein') : val._text);
                                stringified += delimiter + strVal;
                            } else {
                                stringified = '--';
                            }
                            t++;
                        }
                        return stringified;

                    case this.organizeService.instanceOfZD(value[0]):
                        // instance of ZusatzDaten
                        let z = 0;
                        for (const val of <ZusatzDaten[]>value) {
                            for (const m of <Merkmal[]>val.merkmal) {
                                const delimiter = (z > 0 ? '<br>' : '');
                                stringified += delimiter + m._attrname._value + ': ' + (!isArray(m._text) && m._text ? m._text : ' --');
                                z++;
                            }
                        }
                        return stringified;


                    case this.organizeService.instanceOfDM(value[0]):
                        // instance of Datum
                        let d = 0;
                        for (const val of <Datum[]>value) {
                            const delimiter = (d > 0 ? '<br>' : '');
                            stringified += delimiter + this.setDate(val);
                            d++;
                        }
                        return stringified;


                    case this.organizeService.instanceOfZR(value[0]):
                        // instance of Zeitraum
                        let p = 0;
                        for (const val of <Zeitraum[]>value) {
                            const delimiter = (p > 0 ? '<br>' : '');
                            stringified += delimiter + this.setDate(val.von[0]) + ' - ' + this.setDate(val.bis[0]);
                            p++;
                        }
                        return stringified;

                    case this.organizeService.instanceOfDOS(value[0]):

                        stringified = '<i class="warning">Achtung!<br>Dieses Dossier enthält weitere (Sub-)Dossiers &mdash; ein Objekttyp, der noch nicht unterstützt wird.</i>';
                        return stringified;

                    default:
                        return '<i class="hint">Hinweis: Dieser Objekttyp wird noch nicht unterstützt. </i>' + JSON.stringify(value[0]);
                }

            } else {
                // switch in case of an object
                return (value._value ? value._value : '--');
            }
        }
    }


    private parseDate(val: string): string {
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

    private setDate(date: Datum): string {
        const ca = ((date.ca && date.ca[0]._text) ? 'ca. ' : '');
        return ca + this.parseDate(date.datum[0]._text);
    }
}
