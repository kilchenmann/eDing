import { AboutComponent } from './features/info/components/about/about.component';
import { AngularSplitModule } from 'angular-split';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DeliveryTabComponent } from './features/organize/components/delivery-tab/delivery-tab.component';
import { ElectronService } from 'ngx-electron';
import { ErrorComponent } from './core/components/error/error.component';
import { FileUploadComponent } from './features/upload/pages/file-upload/file-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericDialogComponent } from './shared/generic-dialog/generic-dialog.component';
import { HeaderTabComponent } from './features/organize/components/header-tab/header-tab.component';
import { HeadlineComponent } from './core/components/headline/headline.component';
import { InfoPageComponent } from './features/info/pages/info/info-page.component';
import { MaterialModule } from './material-module';
import { NgModule } from '@angular/core';
import { OrganizeComponent } from './features/organize/pages/organize/organize.component';
import { PackageExpansionPanelComponent } from './features/organize/components/package-expansion-panel/package-expansion-panel.component';
import { StartComponent } from './features/info/components/start/start.component';
import { StringifyValuePipe } from './features/organize/pipes/stringify-value.pipe';
import { SummaryTabComponent } from './features/organize/components/summary-tab/summary-tab.component';

@NgModule({
    declarations: [
        AboutComponent,
        AppComponent,
        DeliveryTabComponent,
        ErrorComponent,
        FileUploadComponent,
        GenericDialogComponent,
        HeaderTabComponent,
        HeadlineComponent,
        InfoPageComponent,
        OrganizeComponent,
        PackageExpansionPanelComponent,
        StartComponent,
        StringifyValuePipe,
        SummaryTabComponent
    ],
    imports: [
        AngularSplitModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    providers: [ElectronService],
    bootstrap: [AppComponent]
})
export class AppModule { }
