import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsychologyComponent } from './psychology/psychology.component';
import { PsyHomeComponent } from './psy-home/psy-home.component';
import { PsySideBarComponent } from './psy-side-bar/psy-side-bar.component';


const routes: Routes = [{
  path: '', component: PsychologyComponent,
  children: [
    
    { path: 'psy-home', component: PsyHomeComponent },
    //{ path: 'pending', component: PendingPatientsComponent },
    
    { path: '', redirectTo: 'psy-home', pathMatch: 'full' }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsychologyRoutingModule { }
