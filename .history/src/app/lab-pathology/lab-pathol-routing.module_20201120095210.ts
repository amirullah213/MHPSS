import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { LabPathComponent } from './lab-path/lab-path.component'
import { DiagnosticsPathologyComponent } from './diagnostics-pathology/diagnostics-pathology.component'
import { DiagnosticsPathologySeenComponent } from './diagnostics-pathology-seen/diagnostics-pathology-seen.component';
import { HomeComponent } from './home/home.component';
import { Pending2Component } from './pending2/pending2.component';
const routes: Routes = [
  {
    path: '',
    component: LabPathComponent,
    children: [       
        // { path: 'updatepassword', loadChildren: () => import('./features/update_pass/update_password.module').then(m => m.UpdatePasswordModule) },
      { path: 'home', component: HomeComponent },
      { path: 'pending2', component: DiagnosticsPathologyComponent },
      { path: 'seen', component: DiagnosticsPathologySeenComponent },
      { path: 'pending', component: Pending2Component },
      { path : '', redirectTo : 'home', pathMatch : 'full' }
        
    ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabPatholRoutingModule { }
