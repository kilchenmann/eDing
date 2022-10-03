import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Xml2jsonComponent } from './xml2json/xml2json.component';
import { Xsd2tsComponent } from './xsd2ts/xsd2ts.component';


@NgModule({
  declarations: [
    Xsd2tsComponent,
    Xml2jsonComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  exports: [
    Xsd2tsComponent,
    Xml2jsonComponent
  ]
})

export class ConverterModule { }
