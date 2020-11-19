import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrintComponent } from './print/print.component';
const routes: Routes = [
  {
    path: '', component: PrintComponent,
    children: [
      { path: 'home', component: HomeComponent },
      
      // { path: 'seen', component: SeenPatientsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
  
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintModuleRoutingModule { }
