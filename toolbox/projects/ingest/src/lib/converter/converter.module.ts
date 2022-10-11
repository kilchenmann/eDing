import { CommonModule } from '@angular/common';
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



@NgModule({
    declarations: [
        Xsd2tsComponent,
        Xml2jsonComponent,
        StringifyValuePipe
    ],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
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
        Xml2jsonComponent
    ]
})

export class ConverterModule { }
