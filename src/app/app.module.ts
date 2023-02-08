import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConverterModule } from '@av-dimag/ingest';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { AboutComponent } from './pages/about/about.component';
import { ErrorComponent } from './pages/error/error.component';
import { StartComponent } from './pages/start/start.component';
import { HeadlineComponent } from './shared/headline/headline.component';
import { PlaygroundComponent } from './pages/playground/playground.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericDialogComponent } from './shared/generic-dialog/generic-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        ErrorComponent,
        AboutComponent,
        StartComponent,
        HeadlineComponent,
        PlaygroundComponent,
        FileUploadComponent,
        GenericDialogComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        ConverterModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        MatCardModule,
        MatDialogModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
