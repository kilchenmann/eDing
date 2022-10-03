import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { ErrorMessage, XmlError } from '../../shared';
import { Arelda, Datei, Ordner } from '../../shared/xmlns/bar.admin.ch/arelda/arelda';

@Component({
  selector: 'avd-xml2json',
  templateUrl: './xml2json.component.html',
  styleUrls: ['./xml2json.component.scss']
})
export class Xml2jsonComponent {

  obj: Arelda | XmlError = {};

  // ordner: Ordner[] = [];

  // data preparation for folder structure in tree view
  treeControl = new NestedTreeControl<Ordner>(node => node.ordner as Ordner[]);
  dataSource = new MatTreeNestedDataSource<Ordner>();

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
    private fb: FormBuilder,
    private ngxXml2jsonService: NgxXml2jsonService
  ) { }

  convert() {

    // reset error status
    this.converterError = false;

    const parser = new DOMParser();
    const xml = parser.parseFromString(this.form.value['xml'], 'text/xml');
    this.obj = this.ngxXml2jsonService.xmlToJson(xml);


    if (this.obj.paket) {
      this.form.controls['json'].setValue(JSON.stringify(this.obj, undefined, 4));

        this.obj.paket.inhaltsverzeichnis.ordner.forEach( sip => {
          if (sip.name === 'content') {
            console.log(sip);
            let checkOrdner = sip.ordner as Ordner;
            if (checkOrdner.name) {
              this.dataSource.data = checkOrdner.ordner as Ordner[];
            } else {
              this.dataSource.data = sip.ordner as Ordner[];
            }

            // this.ordner = ordner.ordner as Ordner[];
          }
        });
      // } else {
      //   this.obj.paket.inhaltsverzeichnis.ordner['ordner'].forEach( (ordner: Ordner) => {
      //     console.log(ordner.name)
      //     if (ordner.name === 'content') {
      //       this.ordner = ordner.ordner;
      //       ordner.ordner.forEach( (o: Ordner) => {

      //         console.log(o);
      //       });
      //     }
      //   });
      // }



    } else {
        this.obj = this.obj as XmlError;
        this.converterError = true;
        this.form.controls['json'].setValue('');
        this.error.message = this.obj.html.body.parsererror.div;
    }

  }

  hasChild = (_: number, node: Ordner) => !!node.ordner && ((node.ordner as Ordner[]).length > 0 || (node.ordner as Ordner).ordner as Ordner);

  hasFile = (_: number, node: Ordner) => !!node.datei && ((node.datei as Datei[]).length > 0);

}
