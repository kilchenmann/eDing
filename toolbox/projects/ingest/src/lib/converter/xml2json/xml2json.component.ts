import { NestedTreeControl } from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {
    Datei,
    Datum,
    Dokument,
    Dossier,
    ErrorMessage, Merkmal, Ordner, Ordnungssystem, Ordnungssystemposition, Provenienz,
    SIP,
    TextBoolean,
    TextNumber,
    TextString,
    ValueNumber,
    ValueString,
    Zeitraum,
    ZusatzDaten
} from '../../shared';


// xmlToJSON does not export itself as ES6/ECMA2015 module,
// it is loaded globally in scripts tag of angular.json,
// we still need to declare the namespace to make TypeScript compiler happy.
declare let xmlToJSON: any;

@Component({
    selector: 'avd-xml2json',
    templateUrl: './xml2json.component.html',
    styleUrls: ['./xml2json.component.scss']
})
export class Xml2jsonComponent {

    // load test data
    testdata = [
        'SIP_20070923_KOST_eCH0160_1_1_GEVER',
        'SIP_20220906_Bibliothek-Archiv-Aargau_POC-Test'
    ];

    fileContent = '';

    sip: SIP = {
        paket: []
    };

    dok: Dokument | undefined;

    dos: Dossier | undefined;

    displayDokDetails = false;

    provenienz: Provenienz | undefined;

    fileName = '';

    hideForm = true;

    // data preparation for folder structure in tree view
    treeControl = new NestedTreeControl<Ordner>(node => node.ordner);
    dataSource = new MatTreeNestedDataSource<Ordner>();

    // xml options
    xmlOptions = {
        mergeCDATA: false,      // extract cdata and merge with text nodes
        grokAttr: true,         // convert truthy attributes to boolean, etc
        grokText: true,         // convert truthy text/attr to boolean, etc
        normalize: true,        // collapse multiple spaces to single space
        xmlns: false,           // include namespaces as attributes in output
        namespaceKey: '_ns',    // tag name for namespace objects
        textKey: '_text',       // tag name for text nodes
        valueKey: '_value',     // tag name for attribute values
        attrKey: '_attr',       // tag for attr groups
        cdataKey: '_cdata',     // tag for cdata nodes (ignored if mergeCDATA is true)
        attrsAsObject: false,   // if false, key is used as prefix to name, set prefix to '' to merge children and attrs.
        stripAttrPrefix: true,  // remove namespace prefixes from attributes
        stripElemPrefix: true,  // for elements of same name in diff namespaces, you can enable namespaces and access the nskey property
        childrenAsArray: true   // force children into arrays
    };

    converterError = false;

    error: ErrorMessage = {
        status: 415,
        title: 'Medientyp wird nicht unterstützt',
        text: 'Beim Konvertieren ist ein Fehler aufgetreten. Wahrscheinlich handelt es sich nicht um valides XML.'
    };

    // define form
    form: FormGroup = this.fb.group({
        testdata: [''],
        xml: ['', Validators.required],
        json: ['']
    });

    constructor(
        private fb: FormBuilder,
        private http: HttpClient
    ) { }

    // convert action
    convert() {

        // reset error status
        this.converterError = false;

        // parse xml and return json
        this.sip = xmlToJSON.parseString(this.form.value['xml'], this.xmlOptions);

        console.log('sip json', this.sip);

        if (this.sip.paket && this.sip.paket.length) {
            // display json in the second textarea
            this.form.controls['json'].setValue(JSON.stringify(this.sip, undefined, 4));

            this.sip.paket[0].inhaltsverzeichnis[0].ordner.forEach(content => {
                // display folder structure of content
                if (content.name[0]._text !== 'header') {
                    this.dataSource.data = (content.ordner ? content.ordner : this.sip.paket[0].inhaltsverzeichnis[0].ordner);
                }
            });

            this.provenienz = this.sip.paket[0].ablieferung[0].provenienz[0];

        } else {
            // in case of an error: display the error message
            // const objError = xmlToJSON.parseString(this.form.value['xml'], this.xmlOptions) as XmlError;
            this.converterError = true;
            this.form.controls['json'].setValue('');
            this.error.message = (this.sip.html ? this.sip.html[0].body[0].parsererror[0].h3[0]._text + ' ' +
                this.sip.html[0].body[0].parsererror[0].div[0]._text : 'no error message');
        }

    }

    // check, if a node has child nodes
    hasChild = (_: number, node: Ordner) => (!!node.ordner && node.ordner.length > 0) || (!!node.datei && node.datei.length > 0);


    /**
     * gets file meta
     * @param dateiRef
     */
    getFileMeta(dateiRef: string) {
        // reset dok and dos
        this.dos = undefined;
        this.dok = undefined;

        // start on "ordnungssystemposition" to find dokument or dossier by "datei referenz"
        this._findOsp(this.sip.paket[0].ablieferung[0].ordnungssystem[0].ordnungssystemposition, dateiRef);
        // console.log('ordnungssystem', this.sip.paket[0].ablieferung[0].ordnungssystem[0].name[0]._text);

    }

    /**
     * get xml testdata by folder name, defined in list above
     * @param name
     */
    getTestdata(name: string) {

        if (name) {
            // grab test data from shared/testdata/[name].xml
            const tdxml = name;

            const url = 'https://av-dimag.gitlab.io/ingest-poc';

            this.http.get(`${url}/assets/testdata/${name}.xml`, { responseType: 'text' }).subscribe(data => {
                // console.log(data);
                // and set value in first textarea = "xml"
                this.form.controls['xml'].setValue(data);
                // and convert directly
                this.convert();
            });

        } else {
            // reset form
            this.form.reset();
            this.form.controls['xml'].setValue('');
            this.sip = {
                paket: []
            };
        }
    }

    exportAip(node: Ordner) {
        this.displayDokDetails = false;
        console.log('export aip', node);
        // create metadata.xml
        const xmlDos = document.implementation.createDocument('', '', null);
        const paket = xmlDos.createElement('paket');
        paket.setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
        paket.setAttribute('xmlns', 'http://bar.admin.ch/arelda/v4');
        paket.setAttribute('xsi:schemaLocation', 'http://bar.admin.ch/arelda/v4 xsd/arelda.xsd');
        paket.setAttribute('xsi:type', 'paketAIP');
        paket.setAttribute('schemaVersion', '4.1');

        // header
        const paketTyp = xmlDos.createElement('paketTyp');
        paketTyp.innerHTML = 'AIP';
        paket.appendChild(paketTyp);

        const nameSIP = xmlDos.createElement('nameSIP');
        // todo: WARNING! Hardcoded, but we do not have this information yet
        nameSIP.innerHTML = 'SIP_20070923_KOST_eCH0160_1_1_GEVER';
        paket.appendChild(nameSIP);

        const version = xmlDos.createElement('version');
        version.innerHTML = '0.1';
        paket.appendChild(version);

        // inhaltsverzeichnis
        const inhaltsverzeichnis = xmlDos.createElement('inhaltsverzeichnis');

        const ordner = xmlDos.createElement('ordner');

        const name = xmlDos.createElement('name');
        name.innerHTML = node.name[0]._text;
        ordner.appendChild(name);

        const originalName = xmlDos.createElement('originalName');
        originalName.innerHTML = node.originalName[0]._text;
        ordner.appendChild(originalName);


        node.datei?.forEach(
            (dat: Datei) => {
                const datei = this._createEle('datei', dat);
                ordner.appendChild(datei);
            }
        );

        inhaltsverzeichnis.appendChild(ordner);
        paket.appendChild(inhaltsverzeichnis);

        // ablieferung

        const ablieferung = this._createEle('ablieferung', this.sip.paket[0].ablieferung[0]);

        // ordnungssystem und ordnungssystemposition (vorerst nur) mit dossier
        const ordnungssystem = xmlDos.createElement('ordnungssystem');
        const ordnungssystemposition = xmlDos.createElement('ordnungssystemposition');
        const dossier = xmlDos.createElement('dossier');
        // dossier.setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
        // dossier.setAttribute('xmlns', 'http://bar.admin.ch/arelda/v4');
        // dossier.setAttribute('xsi:schemaLocation', 'http://bar.admin.ch/arelda/v4 xsd/dossier.xsd');
        // dossier.setAttribute('xsi:type', 'paketAIP');
        // dossier.setAttribute('schemaVersion', '4.1');

        // create metadata-dossier.xml
        node.datei?.forEach(
            (dat: Datei) => {
                this.getFileMeta(dat._attrid._value);

                if (this.dok) {
                    const dokument = this._createEle('dokument', this.dok, dat.originalName[0]._text);
                    dossier.appendChild(dokument);
                }
            }
        );

        ordnungssystemposition.appendChild(dossier);
        ordnungssystem.appendChild(ordnungssystemposition);
        ablieferung.appendChild(ordnungssystem);

        // const ablieferung = xmlDos.createElement('ablieferung');
        // ablieferung.setAttribute('xsi:type', this.sip.paket[0].ablieferung[0]._attrtype._value);
        paket.appendChild(ablieferung);


        // dossier

        xmlDos.appendChild(paket);

        const comment = xmlDos.createComment(` ${new Date().toLocaleString('de-CH')} | Automatically generated by AV DIMAG (CH) Ingest Preparation Module `);
        xmlDos.appendChild(comment);


        console.log(xmlDos);


        // download file; solution from https://stackblitz.com/edit/angular-file-save-as?file=src%2Fapp%2Ffile-save-as%2Ffile-save-as.component.ts
        const a = document.createElement('a');

        const serializer = new XMLSerializer();
        const xmlString = `<?xml version="1.0" encoding="UTF-8"?> ${serializer.serializeToString(xmlDos)}`;

        const file = new Blob([xmlString], { type: 'application/xml' });
        a.href = URL.createObjectURL(file);
        a.download = 'metadata.xml';
        a.click();



    }

    /**
     * geht durch die "ordnungssystemposition"-Hierarchie
     * @param ordnungssystemposition
     * @param dateiRef
     */
    private _findOsp(ordnungssystemposition: Ordnungssystemposition[], dateiRef: string) {
        ordnungssystemposition.forEach(
            (osp: Ordnungssystemposition) => {
                if (osp.ordnungssystemposition && osp.ordnungssystemposition.length > 0) {
                    // console.log('go deeper in OSP ...');
                    this._findOsp(osp.ordnungssystemposition, dateiRef);
                }
                if (osp.dossier && osp.dossier.length > 0) {
                    // console.log('search in DOSSIER ...');
                    this._findDos(osp.dossier, dateiRef);
                    // console.log('ordnungssystemposition', osp.titel[0]._text);
                }
            }
        );
    }

    /**
     * geht durch die "dossier"-Hierarchie
     * @param dossier
     * @param dateiRef
     */
    private _findDos(dossier: Dossier[], dateiRef: string) {
        dossier.forEach(
            (dos: Dossier) => {
                if (dos.dokument && dos.dokument.length > 0) {
                    // dateiRef kommt erst im Dokument vor
                    this._findDok(dos.dokument, dateiRef);
                } else if (dos.dateiRef && dos.dateiRef.length) {
                    // dateiRef kommt bereits im Dossier vor
                    const index = dos.dateiRef.findIndex(ref => ref._text === dateiRef);
                    if (index > -1) {
                        this.dos = dos;
                        return;
                    }
                }
            }
        );
    }

    /**
     * geht durch die "dokument"-Hierarchie
     * @param dateiRef
     */
    private _findDok(dokument: Dokument[], dateiRef: string) {
        dokument.forEach(
            (dok: Dokument) => {
                if (dok.dateiRef && dok.dateiRef.length) {
                    const index = dok.dateiRef.findIndex(ref => ref._text === dateiRef);
                    if (index > -1) {
                        this.dok = dok;
                        return;
                    }
                }
            }
        );
    }


    private _createEle(root: string, data: Object, file?: string): HTMLElement {
        const xml = document.implementation.createDocument('', '', null);

        const rootEle = xml.createElement(root);
        Object.entries(data).forEach(([key, value], index) => {
            // check if key is of attribute type
            const attr = key.split('_attr');
            if (attr.length > 1) {
                // switch in case of an object
                switch (true) {
                    case (this._instanceOfVS(value)):
                        // console.log('instance of ValueString', value);
                        rootEle.setAttribute(attr[1], value._value);
                        break;

                    case (this._instanceOfVN(value)):
                        // console.log('instance of ValueNumber', value);
                        rootEle.setAttribute(attr[1], JSON.stringify(value._value));
                        break;

                    default:
                        console.error('Was not able to get type of this object: ', JSON.stringify(value));
                }
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
                        ele.innerHTML = 'Warning! This value is undefined or the element does not exist: ' + JSON.stringify(value);
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
                                    ele.innerHTML = stringified;
                                    break;

                                case this._instanceOfTN(value[0]):
                                    // instance of TextNumber
                                    let i = 0;
                                    for (const val of <TextNumber[]>value) {
                                        const delimiter = (i > 0 ? '<br>' : '');
                                        stringified += delimiter + val._text;
                                        i++;
                                    }
                                    ele.innerHTML = stringified;
                                    break;

                                case this._instanceOfTB(value[0]):
                                    // instance of TextBoolean
                                    // wir gehen davon aus, dass der boolsche Wert nur einmal vorkommt,
                                    // auch wenn der Wert als Array zurückkommt. Deshalb wird lediglich
                                    // der erste Wert zurückgegeben.
                                    ele.innerHTML = (value[0]._text === true ? 'true' : 'false');
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
                                    ele.innerHTML = stringified;
                                    break;


                                case this._instanceOfDM(value[0]):
                                    // instance of Datum
                                    let d = 0;
                                    for (const val of <Datum[]>value) {

                                        if (val.ca && val.ca[d]._text === true) {
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


                                case this._instanceOfZR(value[0]):
                                    // instance of Zeitraum
                                    let p = 0;
                                    for (const val of <Zeitraum[]>value) {

                                        const von = xml.createElement('von');
                                        if (val.von[0].ca && val.von[0].ca[0]._text === true) {
                                            const ca = xml.createElement('ca');
                                            ca.innerHTML = 'true';
                                            von.appendChild(ca);
                                        }

                                        const datumVon = xml.createElement('datum');
                                        datumVon.innerHTML = val.von[0].datum[0]._text;
                                        von.appendChild(datumVon);
                                        ele.appendChild(von);

                                        const bis = xml.createElement('bis');
                                        if (val.bis[0].ca && val.bis[0].ca[0]._text === true) {
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

                                case this._instanceOfPR(value[0]):
                                    // instance of Provenienz
                                    ele = this._createEle('provenienz', value[0]);
                                    break;

                                case this._instanceOfOS(value[0]):
                                    // instance of Ordnungssystem
                                    // skip!!!
                                    // ele = this._createEle('ordnungssystem', value[0]);
                                    break;

                                case this._instanceOfOSP(value[0]):
                                    // instance of Ordnungssystemposition
                                    // skip!!!
                                    // value.forEach(osp => {
                                    //     console.log(osp)
                                    // });
                                    // ele = this._createEle('ordnungssystem', value[0]);
                                    break;

                                default:
                                    ele.innerHTML = 'Warning! This object type (array) is not yet supported: ' + JSON.stringify(value);
                                    break;
                            }

                        } else {
                            // switch in case of an object
                            switch (true) {
                                case (this._instanceOfVS(value)):
                                    // console.log('instance of ValueString', value);
                                    ele.innerHTML = (value._value ? value._value : 'undefined');
                                    break;

                                case (this._instanceOfVN(value)):
                                    // console.log('instance of ValueNumber', value);
                                    ele.innerHTML = JSON.stringify(value._value);
                                    break;

                                default:
                                    ele.innerHTML = 'Warning! This object type (object) is not yet supported: ' + JSON.stringify(value);
                            }
                        }
                    }
                }

                // console.log(index, this.dok?.titel)
                // console.log(key, value);
                rootEle.appendChild(ele);
            }
        });
        return rootEle;
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

    private _instanceOfPR(object: any): object is Provenienz {
        return 'aktenbildnerName' in object || 'registratur' in object;
    }

    private _instanceOfOS(object: any): object is Ordnungssystem {
        return 'ordnungssystemposition' in object && 'generation' in object;
    }

    private _instanceOfOSP(object: any): object is Ordnungssystemposition {
        return 'dossier' in object || 'nummer' in object;
    }

}
