import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../core';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LabRadiologyComponent } from './lab-radiology/lab-radiology.component';

const routes: Routes = [
  {
    path: '',
    component: LabRadiologyComponent,
    children: [
       
        // { path: 'updatepassword', loadChildren: () => import('./features/update_pass/update_password.module').then(m => m.UpdatePasswordModule) },
        { path: 'home', component: HomeComponent },
        { path : '', redirectTo : 'home', pathMatch : 'full' }
        
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadiologyRoutingModule { }
