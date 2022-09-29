import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Component({
    selector: 'app-playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

    // define form
    form: FormGroup = this.fb.group({
        xml: ['', Validators.required],
        json: ['']
    });

    objs: any = {};
    // xml = new FormControl('');

    constructor(
        private fb: FormBuilder,
        private ngxXml2jsonService: NgxXml2jsonService
    ) { }

    ngOnInit(): void {


    }

    convert() {
        const parser = new DOMParser();
        // console.warn('Your order has been submitted', this.form.value['xml']);
        // console.log(this.form.get('xml').value);
        const xml = parser.parseFromString(this.form.value['xml'], 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml);
        this._iterate(obj);
        // object.keys(obj).forEach(function(key){
        //   console.log('has key', key)
        //   // if (obj[key] === value) {
        //   //   delete myjsonobj[key];
        //   // }
        // });
        this.objs = obj;
        this.form.controls['json'].setValue(JSON.stringify(obj, undefined, 4));
    // console.log(this.objs);
    }

    private _iterate(obj: any, path = []) {
        for (const property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (property === '#text') {
                    // console.warn('found #text element, delete it!');
                } else {
                    // console.log('nothing to delete', property);
                    // this.iterate(obj[property]);
                    if (typeof obj[property] == 'object') {
                        this._iterate(obj[property]);
                    }
                }
            }
        }
    }

}
