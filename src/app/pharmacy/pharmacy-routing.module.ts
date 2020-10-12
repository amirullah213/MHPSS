import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PharmaComponent } from './pharma/pharma.component';
import { HomeComponent } from './home/home.component';
import { PharmaSeenPatientsComponent } from './pharma-seen-patients/pharma-seen-patients.component';
import { PharmaPendingPatientsComponent } from './pharma-pending-patients/pharma-pending-patients.component';
import { PharmaPrescriptionComponent } from './pharma-prescription/pharma-prescription.component';

const routes: Routes = [
  { 
    path: '', 
    component: PharmaComponent,
    children: [
      // { path: 'updatepassword', loadChildren: () => import('./features/update_pass/update_password.module').then(m => m.UpdatePasswordModule) },
      { path: 'home', component: HomeComponent },
      { path: 'pending', component: PharmaPendingPatientsComponent },
      { path: 'seen', component: PharmaSeenPatientsComponent },
      { path: 'prescription', component: PharmaPrescriptionComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }

    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyRoutingModule { }
