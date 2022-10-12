import { Pipe, PipeTransform } from '@angular/core';
import {
    Datum,
    Merkmal,
    TextBoolean,
    TextNumber,
    TextString,
    ValueNumber,
    ValueString,
    Zeitraum,
    ZusatzDaten
} from '..';

@Pipe({
    name: 'stringifyValue'
})
export class StringifyValuePipe implements PipeTransform {

    // value could be: ValueString | ValueNumber | TextString[] | TextNumber[] | TextBoolean[] | Datum[] | Zeitraum[]

    transform(value: any): string {
        let stringified = '';

        if (value === undefined) {
            return '<i class="warning">Warning! This value is undefined or the element does not exist.</i>' + JSON.stringify(value);
        } else {
            // which kind of value do we have?
            // switch in case of an array
            if (Array.isArray(value)) {
                switch (true) {
                    case this._instanceOfTS(value[0]):
                        // instance of TextString
                        let t = 0;
                        for (const val of <TextString[]>value) {
                            const delimiter = (t > 0 ? '<br>' : '');
                            stringified += delimiter + val._text;
                            t++;
                        }
                        return stringified;
                        break;

                    case this._instanceOfTN(value[0]):
                        // instance of TextNumber
                        let i = 0;
                        for (const val of <TextNumber[]>value) {
                            const delimiter = (i > 0 ? '<br>' : '');
                            stringified += delimiter + val._text;
                            i++;
                        }
                        return stringified;
                        break;

                    case this._instanceOfTB(value[0]):
                        // instance of TextBoolean
                        // wir gehen davon aus, dass der boolsche Wert nur einmal vorkommt,
                        // auch wenn der Wert als Array zurückkommt. Deshalb wird lediglich
                        // der erste Wert zurückgegeben.
                        return (value[0]._text === 'true' ? 'ja' : 'nein');
                        break;

                    case this._instanceOfZD(value[0]):
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
                        break;


                    case this._instanceOfDM(value[0]):
                        // instance of Datum
                        let d = 0;
                        for (const val of <Datum[]>value) {
                            const delimiter = (d > 0 ? '</br>' : '');
                            stringified += delimiter + this._setDate(val);
                            d++;
                        }
                        return stringified;
                        break;


                    case this._instanceOfZR(value[0]):
                        // instance of Zeitraum
                        let p = 0;
                        for (const val of <Zeitraum[]>value) {
                            const delimiter = (p > 0 ? '</br>' : '');
                            stringified += delimiter + this._setDate(val.von[0]) + ' - ' + this._setDate(val.bis[0]);
                            p++;
                        }
                        return stringified;
                        break;

                    default:
                        return '<i class="warning">Warning! This object type is not yet supported: </i>' + JSON.stringify(value[0]);
                        break;
                }

            } else {
                // switch in case of an object
                switch (true) {
                    case (this._instanceOfVS(value)):
                        // console.log('instance of ValueString', value);
                        return (value._value ? value._value : 'undefined');
                        break;

                    case (this._instanceOfVN(value)):
                        // console.log('instance of ValueNumber', value);
                        return JSON.stringify(value._value);
                        break;

                    default:
                        return '<i class="warning">Warning! This object type is not yet supported: </i>' + JSON.stringify(value);
                }
            }
        }

        // return stringified;
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
        const ca = ((date.ca && date.ca[0]._text === true) ? 'ca. ' : '');
        return ca + this._parseDate(date.datum[0]._text);
    }

    // which type do we have? Solution from
    // https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript
    private _instanceOfTS(object: any): object is TextString {
        return '_text' in object && typeof object._text == 'string';
    }

    private _instanceOfTN(object: any): object is TextNumber {
        return '_text' in object && typeof object._text == 'number';
    }

    private _instanceOfTB(object: any): object is TextBoolean {
        return '_text' in object && typeof object._text == 'boolean';
    }

    private _instanceOfVS(object: any): object is ValueString {
        return '_value' in object && typeof object._value == 'string';
    }

    private _instanceOfVN(object: any): object is ValueNumber {
        return '_value' in object && typeof object._value == 'number';
    }

    private _instanceOfDM(object: any): object is Datum {
        return 'datum' in object;
    }

    private _instanceOfZR(object: any): object is Zeitraum {
        return 'von' in object || 'bis' in object;
    }

    private _instanceOfZD(object: any): object is ZusatzDaten {
        return 'merkmal' in object;
    }



}
