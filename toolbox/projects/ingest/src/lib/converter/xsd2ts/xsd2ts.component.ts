import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessage } from '../../shared';

@Component({
  selector: 'avd-xsd2ts',
  templateUrl: './xsd2ts.component.html',
  styleUrls: ['./xsd2ts.component.scss']
})
export class Xsd2tsComponent {

  obj = {};

  converterError = false;

  error: ErrorMessage = {
    status: 415,
    title: 'Medientyp wird nicht unterstützt',
    text: 'Beim Konvertieren ist ein Fehler aufgetreten. Wahrscheinlich handelt es sich nicht um valides XML.'
  };

  // define form
  form: FormGroup = this.fb.group({
    xsd: ['', Validators.required],
    tsi: ['']
  });

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this._openSnackBar('Die xsd2ts Komponente funktioniert noch nicht!', 'note');
  }

  convert() {

    // reset error status
    this.converterError = false;

    const parser = new DOMParser();
    const xsd = parser.parseFromString(this.form.value['xsd'], 'text/xml');
    // this.obj = this.ngxXml2jsonService.xmlToJson(xml);

    // if (this.obj.paket) {
    //   this.form.controls['json'].setValue(JSON.stringify(this.obj, undefined, 4));
    // } else {
    //     this.obj = this.obj as XmlError;
    //     this.converterError = true;
    //     this.form.controls['json'].setValue('');
    //     this.error.message = this.obj.html.body.parsererror.div;
    // }

  }

  private _openSnackBar(message: string, type: 'success' | 'failed' | 'note' = 'note', action: string = 'x') {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type
    });
  }

}
