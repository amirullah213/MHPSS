import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WardComponent } from './ward/ward.component';
import { HomeComponent } from './home/home.component';
import { PendingPatientsComponent } from './pending-patients/pending-patients.component';
import { DischargedPatientsComponent } from './discharged-patients/discharged-patients.component';
import { AdmittedPatientsComponent } from './admitted-patients/admitted-patients.component';
import { WardListComponent } from './ward-list/ward-list.component';
import { DischargePatientMedicineComponent } from './discharge-patient-medicine/discharge-patient-medicine.component';

const routes: Routes = [{
  path: '', component: WardListComponent,
  children: [
    // { path: 'updatepassword', loadChildren: () => import('./features/update_pass/update_password.module').then(m => m.UpdatePasswordModule) },
    { path: 'home', component: HomeComponent },
    { path: 'pending', component: PendingPatientsComponent },
    { path: 'admitted', component: AdmittedPatientsComponent },
    { path: 'discharged', component: DischargedPatientsComponent },
    { path: 'discharged-med', component: DischargePatientMedicineComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }

  ]

 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WardRoutingModule { }
