import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../core';
import { ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';

import { RadiologyRoutingModule } from './radiology-routing.module';
import { HomeComponent } from './home/home.component';
import { LabRadiologyComponent } from './lab-radiology/lab-radiology.component';
import { RadiologySideBarComponent } from './radiology-side-bar/radiology-side-bar.component';
import { DiagnosisPendingRadComponent } from './diagnosis-pending-rad/diagnosis-pending-rad.component';
import { DiagnosisSeenRadComponent } from './diagnosis-seen-rad/diagnosis-seen-rad.component';


@NgModule({
  declarations: [HomeComponent, LabRadiologyComponent, RadiologySideBarComponent, DiagnosisPendingRadComponent, DiagnosisSeenRadComponent],
  imports: [
    CommonModule,
    RadiologyRoutingModule, FormsModule, ReactiveFormsModule, SharedModule, DataTablesModule, ModalModule.forRoot(), BsDatepickerModule.forRoot(), CollapseModule.forRoot()
  ]
})
export class RadiologyModule { }
