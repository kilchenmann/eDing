import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Component({
  selector: 'avd-xml2json',
  templateUrl: './xml2json.component.html',
  styleUrls: ['./xml2json.component.css']
})
export class Xml2jsonComponent {

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
    const parser = new DOMParser();
    const xml = parser.parseFromString(this.form.value['xml'], 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(xml);
    this.form.controls['json'].setValue(JSON.stringify(obj, undefined, 4));
  }

}
