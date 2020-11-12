import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';

import { OperationRoutingModule } from './operation-routing.module';
import { HomeComponent } from './home/home.component';
import { OperationSideBarComponent } from './operation-side-bar/operation-side-bar.component';
import { OtComponent } from './ot/ot.component';
import { PendingPatientsComponent } from './pending-patients/pending-patients.component';
import { SeenPatientsComponent } from './seen-patients/seen-patients.component';


@NgModule({
  declarations: [HomeComponent, OperationSideBarComponent, OtComponent, PendingPatientsComponent, SeenPatientsComponent],
  imports: [
    OperationRoutingModule, ReactiveFormsModule, CommonModule, SharedModule, DataTablesModule, ModalModule.forRoot(), FormsModule, BsDatepickerModule.forRoot(), CollapseModule.forRoot(),
   
  ]
})
export class OperationModule { }
