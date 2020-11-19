import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LabourRoomComponent } from './labour-room/labour-room.component';
import { AdmittedPatientsComponent } from './admitted-patients/admitted-patients.component';
import { DischargedPatientComponent } from './discharged-patient/discharged-patient.component';
import { PendingPatientsComponent } from './pending-patients/pending-patients.component';

const routes: Routes = [{
  path: '', component: LabourRoomComponent,
  children: [
    { path: 'home', component: HomeComponent },
    { path: 'pending', component: PendingPatientsComponent },
    { path: 'dis-card', component: DischargedPatientComponent },
    { path: 'seen', component: AdmittedPatientsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabourRoomRoutingModule { }
