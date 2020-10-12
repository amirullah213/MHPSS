import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';

import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PharmaComponent } from './pharma/pharma.component';
import { HomeComponent } from './home/home.component';
import { PharmaSideBarComponent } from './pharma-side-bar/pharma-side-bar.component';
import { PharmaSeenPatientsComponent } from './pharma-seen-patients/pharma-seen-patients.component';
import { PharmaPendingPatientsComponent } from './pharma-pending-patients/pharma-pending-patients.component';
import { PharmaPrescriptionComponent } from './pharma-prescription/pharma-prescription.component';


@NgModule({
  declarations: [PharmacyComponent, PharmaComponent, HomeComponent, PharmaSideBarComponent, PharmaSeenPatientsComponent, PharmaPendingPatientsComponent, PharmaPrescriptionComponent],
  imports: [
    CommonModule,
    PharmacyRoutingModule, SharedModule, DataTablesModule, ModalModule.forRoot(), FormsModule, BsDatepickerModule.forRoot(), CollapseModule.forRoot(),
  ]
})
export class PharmacyModule { }
