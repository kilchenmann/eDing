import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessage, SIP } from '../../shared';

import * as JsonToXML from 'jsontoxml';
// import { Options, Parser } from './json-xml-parser';
// import { Parser } from 'json-xml-parse/src/index.js'

// import {  } from './json-xml-parser';

// declare let json_xml_parse: any;
// declare let parser: any;

// declare let parser: Parser from 'json-xml-parse/src/';

// const parser = require('json-xml-parse');


@Component({
    selector: 'avd-json2xml',
    templateUrl: './json2xml.component.html',
    styleUrls: ['./json2xml.component.scss']
})
export class Json2xmlComponent {

    // todo: hier müsste es ein AIP sein, das vorausschichtlich weitere / andere Datenfelder benötigt
    aip = '';

    // parser: Parser;

    options = {
        indent: true,
        attrsNode: '_attrs',
        textNode: '_text',
        entities: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            // '<': '&lt;',
            // '>': '&gt;',
            // '&': '&amp;',
            // '"': '&quot;',
            // "'": '&apos;',
        }
    };

    // dok: Dokument | undefined;

    // dos: Dossier | undefined;

    // data preparation for folder structure in tree view
    // treeControl = new NestedTreeControl<Ordner>(node => node.ordner);
    // dataSource = new MatTreeNestedDataSource<Ordner>();

    // xml options
    // xmlOptions = {
    //     mergeCDATA: false,	// extract cdata and merge with text nodes
    //     grokAttr: true,		// convert truthy attributes to boolean, etc
    //     grokText: true,		// convert truthy text/attr to boolean, etc
    //     normalize: true,	// collapse multiple spaces to single space
    //     xmlns: false, 		// include namespaces as attributes in output
    //     namespaceKey: '_ns', 	// tag name for namespace objects
    //     textKey: '_text', 	// tag name for text nodes
    //     valueKey: '_value', 	// tag name for attribute values
    //     attrKey: '_attr', 	// tag for attr groups
    //     cdataKey: '_cdata',	// tag for cdata nodes (ignored if mergeCDATA is true)
    //     attrsAsObject: false, 	// if false, key is used as prefix to name, set prefix to '' to merge children and attrs.
    //     stripAttrPrefix: true, 	// remove namespace prefixes from attributes
    //     stripElemPrefix: true, 	// for elements of same name in diff namespaces, you can enable namespaces and access the nskey property
    //     childrenAsArray: true 	// force children into arrays
    // };

    converterError = false;

    error: ErrorMessage = {
        status: 415,
        title: 'Medientyp wird nicht unterstützt',
        text: 'Beim Konvertieren ist ein Fehler aufgetreten. Wahrscheinlich handelt es sich nicht um valides XML.'
    };

    // define form
    form: FormGroup = this.fb.group({
        testdata: [''],
        json: ['', Validators.required],
        xml: ['']
    });

    constructor(
        private fb: FormBuilder
    ) { }


    // convert action
    convert() {

        // reset error status
        this.converterError = false;

        // parse xml and return json
        this.aip = JsonToXML(this.form.value['json']);

        console.log('aip xml', this.aip);



        // if (this.sip.paket && this.sip.paket.length) {
        //     // display json in the second textarea
        //     this.form.controls['json'].setValue(JSON.stringify(this.sip, undefined, 4));

        //     this.sip.paket[0].inhaltsverzeichnis[0].ordner.forEach(content => {
        //         // display folder structure of content
        //         if (content.name[0]._text !== 'header') {
        //             this.dataSource.data = (content.ordner ? content.ordner : this.sip.paket[0].inhaltsverzeichnis[0].ordner);
        //         }
        //     });

        // } else {
        //     // in case of an error: display the error message
        //     // const objError = xmlToJSON.parseString(this.form.value['xml'], this.xmlOptions) as XmlError;
        //     this.converterError = true;
        //     this.form.controls['json'].setValue('');
        //     this.error.message = (this.sip.html ? this.sip.html[0].body[0].parsererror[0].h3[0]._text + ' ' +
        //         this.sip.html[0].body[0].parsererror[0].div[0]._text : 'no error message');
        // }

    }
}
