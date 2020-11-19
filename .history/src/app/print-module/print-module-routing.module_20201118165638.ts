import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrintComponent } from './print/print.component';
import { RadiologyComponent } from './radiology/radiology.component';
import { PathologyComponent } from './pathology/pathology.component';
const routes: Routes = [
  {
    path: '', component: PrintComponent,
    children: [
      { path: 'home', component: HomeComponent },
      
       { path: 'pathology', component: PathologyComponent },
       { path: 'radiology', component: RadiologyComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
  
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintModuleRoutingModule { }
