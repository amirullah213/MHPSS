import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';

import { SharedModule } from '../core';
import { SideBarAdminComponent } from './side-bar-admin/side-bar-admin.component';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [AdminHomeComponent, AdminComponentComponent, SideBarAdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,SharedModule,DataTablesModule,ModalModule
  ]
})
export class AdminModule { }
