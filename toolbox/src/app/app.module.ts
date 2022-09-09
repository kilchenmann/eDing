import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Xsd2tsModule } from 'projects/xsd2ts/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { ErrorComponent } from './pages/error/error.component';
import { AboutComponent } from './pages/about/about.component';
import { StartComponent } from './pages/start/start.component';
import { HeadlineComponent } from './shared/headline/headline.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    AboutComponent,
    StartComponent,
    HeadlineComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    Xsd2tsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
