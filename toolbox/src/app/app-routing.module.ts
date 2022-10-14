import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    Json2xmlComponent,
    Xml2jsonComponent,
    Xsd2tsComponent
} from '@av-dimag/ingest';
import { AboutComponent } from './pages/about/about.component';
import { ErrorComponent } from './pages/error/error.component';
import { PlaygroundComponent } from './pages/playground/playground.component';
import { StartComponent } from './pages/start/start.component';

const routes: Routes = [
    {
        path: '',
        component: StartComponent
    },
    // modules
    {
        path: 'xsd2ts',
        component: Xsd2tsComponent
    },
    {
        path: 'xml2json',
        component: Xml2jsonComponent
    },
    {
        path: 'json2xml',
        component: Json2xmlComponent
    },
    // main pages
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'playground',
        component: PlaygroundComponent
    },
    // in case of an error
    {
        path: '**',
        component: ErrorComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
