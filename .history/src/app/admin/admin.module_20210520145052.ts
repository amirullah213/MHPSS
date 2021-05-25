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
import { syncDataComponent } from './syncData/syncData.component';
import {ConnectionServiceModule} from 'ng-connection-service';   


import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CovidReportPatComponent } from './covid-report-pat/covid-report-pat.component';
import { CovidLabComponent } from './covid-lab/covid-lab.component';
import { AddNewDataComponent } from './add-new-data/add-new-data.component';
import { ShowDataComponent } from './show-data/show-data.component';
import {AgmMap,MapsAPILoader  } from '@agm/core'; 
// MouseEvent
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [AdminHomeComponent, AdminComponentComponent, SideBarAdminComponent, DiagnosticListComponent, PathologyListComponent, RadiologyListComponent, PharmcyComponent, AmbulanceComponent, ComplaintsComponent, SignsComponent, EmrSummaryReportComponent,syncDataComponent, CovidReportPatComponent, CovidLabComponent, AddNewDataComponent, ShowDataComponent],
  imports: [
    ConnectionServiceModule,
    CommonModule,
    AdminRoutingModule, FormsModule, ReactiveFormsModule, SharedModule, DataTablesModule, ModalModule.forRoot(), BsDatepickerModule.forRoot(), CollapseModule.forRoot(),
    TypeaheadModule.forRoot(),
    AgmCoreModule.forRoot({  
      apiKey: 'AIzaSyAzQQS7-MUyG5TOa5Loyp132wFmlCyAJrI'  
    }),
  ]
})
export class AdminModule { }
