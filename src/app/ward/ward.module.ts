import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgxPrintModule} from 'ngx-print';


import { WardRoutingModule } from './ward-routing.module';
import { WardComponent } from './ward/ward.component';
import { HomeComponent } from './home/home.component';
import { WardSideBarComponent } from './ward-side-bar/ward-side-bar.component';
import { PendingPatientsComponent } from './pending-patients/pending-patients.component';
import { DischargedPatientsComponent } from './discharged-patients/discharged-patients.component';
import { AdmittedPatientsComponent } from './admitted-patients/admitted-patients.component';
import { WardListComponent } from './ward-list/ward-list.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { IsdirectPipe } from './pipes/isdirect.pipe';
import {DischargePatientMedicineComponent} from './discharge-patient-medicine/discharge-patient-medicine.component'



@NgModule({
  declarations: [WardComponent, HomeComponent, WardSideBarComponent, PendingPatientsComponent, DischargedPatientsComponent, AdmittedPatientsComponent, WardListComponent, IsdirectPipe,DischargePatientMedicineComponent],
  imports: [
    CommonModule,
    WardRoutingModule, CommonModule, ReactiveFormsModule, NgxPrintModule, SharedModule, DataTablesModule, ModalModule.forRoot(), FormsModule, BsDatepickerModule.forRoot(), CollapseModule.forRoot(),
    TypeaheadModule.forRoot(),
  ]
})
export class WardModule { }
