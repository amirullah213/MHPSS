import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PharmaComponent } from './pharma/pharma.component';
import { HomeComponent } from './home/home.component';
import { PharmaSeenPatientsComponent } from './pharma-seen-patients/pharma-seen-patients.component';
import { PharmaPendingPatientsComponent } from './pharma-pending-patients/pharma-pending-patients.component';
import { PharmaPrescriptionComponent } from './pharma-prescription/pharma-prescription.component';
import { MedicineGrnComponent } from './medicine-grn/medicine-grn.component';
import { MedicineDiscardComponent } from './medicine-discard/medicine-discard.component';
import { NonMedicineDiscardComponent } from './non-medicine-discard/non-medicine-discard.component';
import { NonMedicineGrnComponent } from './non-medicine-grn/non-medicine-grn.component';
import { ItemsStatusComponent } from './items-status/items-status.component';
import { IssueGrnComponent } from './issue-grn/issue-grn.component';
import { SyncDataComponent } from './sync-data/sync-data.component';
import { GrnsComponent } from './grns/grns.component';
import { StockreqSateliteComponent } from './stockreq-satelite/stockreq-satelite.component';
import { RecieveGrnSatComponent } from './recieve-grn-sat/recieve-grn-sat.component';
import { IssueSattMedicComponent } from './issue-satt-medic/issue-satt-medic.component';
import { DispenseStockComponent } from './dispense-stock/dispense-stock.component';
import { AllPatsComponent } from './all-pats/all-pats.component';

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
      { path: 'medicine-grn', component: MedicineGrnComponent },
      { path: 'medicine-discard', component: MedicineDiscardComponent },
      { path: 'non-medicine-grn', component: NonMedicineGrnComponent },
      { path: 'non-medicine-discard', component: NonMedicineDiscardComponent },
      { path: 'item-status', component: ItemsStatusComponent },
      { path: 'issue-grn', component: IssueGrnComponent },
      { path: 'sync', component: SyncDataComponent },
      { path: 'grns', component: GrnsComponent },
      { path: 'stockReqSatelite', component: StockreqSateliteComponent },
       { path: 'recievaeGrnSat', component: RecieveGrnSatComponent },
      { path: 'home2', component: IssueSattMedicComponent },
      { path: 'dispense', component: DispenseStockComponent },
      { path: 'allpats', component: AllPatsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }

    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyRoutingModule { }
