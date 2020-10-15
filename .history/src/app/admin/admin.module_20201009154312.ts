import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';

import { SharedModule } from '../core';
import { SideBarAdminComponent } from './side-bar-admin/side-bar-admin.component';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { DiagnosticListComponent } from './diagnostic-list/diagnostic-list.component';
import { PathologyListComponent } from './pathology-list/pathology-list.component';
import { RadiologyListComponent } from './radiology-list/radiology-list.component';
import { PharmcyComponent } from './pharmcy/pharmcy.component';
import { AmbulanceComponent } from './ambulance/ambulance.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { SignsComponent } from './signs/signs.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { EmrSummaryReportComponent } from './emr-summary-report/emr-summary-report.component';


import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  declarations: [AdminHomeComponent, AdminComponentComponent, SideBarAdminComponent, DiagnosticListComponent, PathologyListComponent, RadiologyListComponent, PharmcyComponent, AmbulanceComponent, ComplaintsComponent, SignsComponent, EmrSummaryReportComponent],
  imports: [
    CommonModule,
    AdminRoutingModule, FormsModule, ReactiveFormsModule, SharedModule, DataTablesModule, ModalModule.forRoot(), BsDatepickerModule.forRoot(), CollapseModule.forRoot(),
    TypeaheadModule.forRoot()
  ]
})
export class AdminModule { }
