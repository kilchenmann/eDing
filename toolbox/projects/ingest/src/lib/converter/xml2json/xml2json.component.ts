import { NestedTreeControl } from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {
    Dokument,
    Dossier,
    ErrorMessage,
    Ordner,
    Ordnungssystemposition,
    Provenienz,
    SIP
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

    provenienz: Provenienz | undefined;

    fileName = '';

    hideForm = true;

    // data preparation for folder structure in tree view
    treeControl = new NestedTreeControl<Ordner>(node => node.ordner);
    dataSource = new MatTreeNestedDataSource<Ordner>();

    // xml options
    xmlOptions = {
        mergeCDATA: false,	// extract cdata and merge with text nodes
        grokAttr: true,		// convert truthy attributes to boolean, etc
        grokText: true,		// convert truthy text/attr to boolean, etc
        normalize: true,	// collapse multiple spaces to single space
        xmlns: false, 		// include namespaces as attributes in output
        namespaceKey: '_ns', 	// tag name for namespace objects
        textKey: '_text', 	// tag name for text nodes
        valueKey: '_value', 	// tag name for attribute values
        attrKey: '_attr', 	// tag for attr groups
        cdataKey: '_cdata',	// tag for cdata nodes (ignored if mergeCDATA is true)
        attrsAsObject: false, 	// if false, key is used as prefix to name, set prefix to '' to merge children and attrs.
        stripAttrPrefix: true, 	// remove namespace prefixes from attributes
        stripElemPrefix: true, 	// for elements of same name in diff namespaces, you can enable namespaces and access the nskey property
        childrenAsArray: true 	// force children into arrays
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
                    this.dataSource.data = ( content.ordner ? content.ordner : this.sip.paket[0].inhaltsverzeichnis[0].ordner);
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
        console.log('ordnungssystem', this.sip.paket[0].ablieferung[0].ordnungssystem[0].name[0]._text);

    }

    /**
     * get xml testdata by folder name, defined in list above
     * @param name
     */
    getTestdata(name: string) {

        if (name) {
            // grab test data from shared/testdata/[name].xml
            const tdxml = name;

            this.http.get(`/assets/testdata/${name}.xml`, { responseType:  'text' }).subscribe(data => {
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

    exportAip() {
        console.log('export data');
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
                    console.log('ordnungssystemposition', osp.titel[0]._text);
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

}
