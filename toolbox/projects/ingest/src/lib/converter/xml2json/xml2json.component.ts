import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ErrorMessage, Ordner, SIP, XmlError } from '../../shared';

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

  obj: SIP = {};

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
    xml: ['', Validators.required],
    json: ['']
  });

  constructor(
    private fb: FormBuilder
  ) { }

  // convert action
  convert() {

    // reset error status
    this.converterError = false;

    // parse xml and return json
    this.obj = xmlToJSON.parseString(this.form.value['xml'], this.xmlOptions);

    if ((this.obj).paket) {
      // display json in the second textarea
      this.form.controls['json'].setValue(JSON.stringify(this.obj, undefined, 4));

        this.obj.paket[0].inhaltsverzeichnis[0].ordner.forEach( content => {
          // display folder structure of content
          if (content.name[0]._text === 'content') {
            this.dataSource.data = content.ordner;
          }
        });

    } else {
      // in case of an error: display the error message
        const objError = this.obj as XmlError;
        this.converterError = true;
        this.form.controls['json'].setValue('');
        this.error.message = objError.html[0].body[0].parsererror[0].h3[0]._text + ' ' +
        objError.html[0].body[0].parsererror[0].div[0]._text;
    }

  }

  // check, if a node has child nodes
  hasChild = (_: number, node: Ordner) => (!!node.ordner && node.ordner.length > 0) || (!!node.datei && node.datei.length > 0);

}
