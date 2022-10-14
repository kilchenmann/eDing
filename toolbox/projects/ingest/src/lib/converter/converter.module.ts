import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StringifyValuePipe } from '../shared';
import { Xml2jsonComponent } from './xml2json/xml2json.component';
import { Xsd2tsComponent } from './xsd2ts/xsd2ts.component';
import { Json2xmlComponent } from './json2xml/json2xml.component';

@NgModule({
    declarations: [
        Xsd2tsComponent,
        Xml2jsonComponent,
        StringifyValuePipe,
        Json2xmlComponent
    ],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTabsModule,
        MatTreeModule,
        MatTooltipModule,
        ReactiveFormsModule
    ],
    exports: [
        Xsd2tsComponent,
        Xml2jsonComponent,
        Json2xmlComponent
    ]
})

export class ConverterModule { }
