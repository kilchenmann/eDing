import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPageComponent } from './features/info/pages/info/info-page.component';
import { ErrorComponent } from './core/components/error/error.component';
import { OrganizeComponent } from './features/organize/pages/organize/organize.component';
import { FileUploadComponent } from './features/upload/pages/file-upload/file-upload.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'upload',
        pathMatch: 'full'
    },
    // main pages
    {
        path: 'upload',
        component: FileUploadComponent
    },
    {
        path: 'organize',
        component: OrganizeComponent
    },
    {
        path: 'info',
        component: InfoPageComponent
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
