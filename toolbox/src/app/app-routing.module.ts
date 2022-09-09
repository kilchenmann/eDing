import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Xsd2tsComponent } from 'projects/xsd2ts/src/public-api';
import { AboutComponent } from './pages/about/about.component';
import { ErrorComponent } from './pages/error/error.component';
import { StartComponent } from './pages/start/start.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  // modules
  { path: 'xsd2ts', component: Xsd2tsComponent },
  // main pages
  { path: 'about', component: AboutComponent },
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
