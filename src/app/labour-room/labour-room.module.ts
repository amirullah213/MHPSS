import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { LabourRoomRoutingModule } from './labour-room-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HomeComponent } from './home/home.component';
import { LabourRoomComponent } from './labour-room/labour-room.component';
import { AdmittedPatientsComponent } from './admitted-patients/admitted-patients.component';
import { DischargedPatientComponent } from './discharged-patient/discharged-patient.component';
import { PendingPatientsComponent } from './pending-patients/pending-patients.component';


@NgModule({
  declarations: [SideBarComponent, HomeComponent, LabourRoomComponent, AdmittedPatientsComponent, DischargedPatientComponent, PendingPatientsComponent],
  imports: [
    CommonModule,
    LabourRoomRoutingModule, SharedModule, DataTablesModule, ModalModule.forRoot(), FormsModule,
    BsDatepickerModule.forRoot(), CollapseModule.forRoot(), TimepickerModule.forRoot(),
  ]
})
export class LabourRoomModule { }
