import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { ErrorComponent } from './core/components/error/error.component';
import { HeadlineComponent } from './core/components/headline/headline.component';
import { PlaygroundComponent } from './features/playground/pages/playground/playground.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericDialogComponent } from './shared/generic-dialog/generic-dialog.component';
import { FileUploadComponent } from './features/upload/pages/file-upload/file-upload.component';
import { AboutComponent } from './features/info/components/about/about.component';
import { StartComponent } from './features/info/components/start/start.component';
import { InfoPageComponent } from './features/info/pages/info/info-page.component';
import { OrganizeComponent } from './features/organize/pages/organize/organize.component';
import { StringifyValuePipe } from './features/organize/pipes/stringify-value.pipe';
import { HttpClientModule } from '@angular/common/http';
import { SummaryTabComponent } from './features/organize/components/summary-tab/summary-tab.component';
import { HeaderTabComponent } from './features/organize/components/header-tab/header-tab.component';
import { DeliveryTabComponent } from './features/organize/components/delivery-tab/delivery-tab.component';
import { AngularSplitModule } from 'angular-split';
import {
    PackageExpansionPanelComponent
} from './features/organize/components/package-expansion-panel/package-expansion-panel.component';
import { ElectronService } from 'ngx-electron';

@NgModule({
    declarations: [
        AppComponent,
        ErrorComponent,
        AboutComponent,
        StartComponent,
        HeadlineComponent,
        PlaygroundComponent,
        FileUploadComponent,
        GenericDialogComponent,
        InfoPageComponent,
        OrganizeComponent,
        StringifyValuePipe,
        SummaryTabComponent,
        HeaderTabComponent,
        DeliveryTabComponent,
        PackageExpansionPanelComponent
    ],
    imports: [
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AngularSplitModule
    ],
    providers: [ElectronService],
    bootstrap: [AppComponent]
})
export class AppModule { }
