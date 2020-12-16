import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PsyHomeComponent } from './psy-home/psy-home.component';

const routes: Routes = [{
  path: '', component: PsyHomeComponent,
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
