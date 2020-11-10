import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';

import { PharmacyRoutingModule } from './pharmacy-routing.module';

import { PharmaComponent } from './pharma/pharma.component';
import { HomeComponent } from './home/home.component';
import { PharmaSideBarComponent } from './pharma-side-bar/pharma-side-bar.component';
import { PharmaSeenPatientsComponent } from './pharma-seen-patients/pharma-seen-patients.component';
import { PharmaPendingPatientsComponent } from './pharma-pending-patients/pharma-pending-patients.component';
import { PharmaPrescriptionComponent } from './pharma-prescription/pharma-prescription.component';
import { MedicineGrnComponent } from './medicine-grn/medicine-grn.component';
import { MedicineDiscardComponent } from './medicine-discard/medicine-discard.component';
import { NonMedicineDiscardComponent } from './non-medicine-discard/non-medicine-discard.component';
import { NonMedicineGrnComponent } from './non-medicine-grn/non-medicine-grn.component';
import { ItemsStatusComponent } from './items-status/items-status.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { IssueGrnComponent } from './issue-grn/issue-grn.component';
import { SyncDataComponent } from './sync-data/sync-data.component';
import { GrnsComponent } from './grns/grns.component';
import { StockreqSateliteComponent } from './stockreq-satelite/stockreq-satelite.component';
//import { RecieveGrnSatComponent } from './recieve-grn-sat/recieve-grn-sat.component';
import { IssueSattMedicComponent } from './issue-satt-medic/issue-satt-medic.component';
import { DispenseStockComponent } from './dispense-stock/dispense-stock.component';

@NgModule({
  declarations: [ PharmaComponent, HomeComponent, PharmaSideBarComponent, PharmaSeenPatientsComponent, PharmaPendingPatientsComponent, PharmaPrescriptionComponent, MedicineGrnComponent, MedicineDiscardComponent, NonMedicineDiscardComponent, NonMedicineGrnComponent, ItemsStatusComponent, IssueGrnComponent, SyncDataComponent, GrnsComponent, StockreqSateliteComponent, RecieveGrnSatComponent, IssueSattMedicComponent, DispenseStockComponent],
  imports: [
    CommonModule,
    PharmacyRoutingModule, ReactiveFormsModule, SharedModule, DataTablesModule, ModalModule.forRoot(), FormsModule, BsDatepickerModule.forRoot(), CollapseModule.forRoot(),TypeaheadModule.forRoot(),
  ],
  providers: [DatePipe]
})
export class PharmacyModule { }
