import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
  declarations: [ PharmaComponent, HomeComponent, PharmaSideBarComponent, PharmaSeenPatientsComponent, PharmaPendingPatientsComponent, PharmaPrescriptionComponent, MedicineGrnComponent, MedicineDiscardComponent, NonMedicineDiscardComponent, NonMedicineGrnComponent, ItemsStatusComponent],
  imports: [
    CommonModule,
    PharmacyRoutingModule, ReactiveFormsModule, SharedModule, DataTablesModule, ModalModule.forRoot(), FormsModule, BsDatepickerModule.forRoot(), CollapseModule.forRoot(),TypeaheadModule.forRoot(),
  ]
})
export class PharmacyModule { }
