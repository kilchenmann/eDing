import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {


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
