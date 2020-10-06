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
import { DiagnosticListComponent } from './diagnostic-list/diagnostic-list.component';
import { PathologyListComponent } from './pathology-list/pathology-list.component';
import { RadiologyListComponent } from './radiology-list/radiology-list.component';
import { PharmcyComponent } from './pharmcy/pharmcy.component';
import { AmbulanceComponent } from './ambulance/ambulance.component';




@NgModule({
  declarations: [AdminHomeComponent, AdminComponentComponent, SideBarAdminComponent, DiagnosticListComponent, PathologyListComponent, RadiologyListComponent, PharmcyComponent, AmbulanceComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,SharedModule,DataTablesModule,ModalModule.forRoot(),FormsModule
  ]
})
export class AdminModule { }
