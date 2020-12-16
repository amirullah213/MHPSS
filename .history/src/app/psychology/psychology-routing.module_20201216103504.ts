import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PsyHomeComponent } from './psy-home/psy-home.component';
import { PsySideBarComponent } from './psy-side-bar/psy-side-bar.component';
import { PsychologyComponent } from './psychology/psychology.component';

const routes: Routes = [{
  path: '', component: PsyHomeComponent,
  children: [
    // { path: 'updatepassword', loadChildren: () => import('./features/update_pass/update_password.module').then(m => m.UpdatePasswordModule) },
    { path: 'psy-home', component: PsyHomeComponent },
    //{ path: 'pending', component: PendingPatientsComponent },
    
    { path: '', redirectTo: 'home', pathMatch: 'full' }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsychologyRoutingModule { }
