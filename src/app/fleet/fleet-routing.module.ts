import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FleetComponent } from './fleet/fleet.component';
import { HomeComponent } from './home/home.component';
import { NewPatientsComponent } from './new-patients/new-patients.component';
import { PendingPatientsComponent } from './pending-patients/pending-patients.component';
import { AllAmbulancesComponent } from './all-ambulances/all-ambulances.component';

const routes: Routes = [
  {
    path: '',
    component: FleetComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'new-patient', component: NewPatientsComponent },
      { path: 'pending-patient', component: PendingPatientsComponent },
      { path: 'all-ambulance', component: AllAmbulancesComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule { }
