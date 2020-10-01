import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';

import { SharedModule } from '../core';
import { SideBarAdminComponent } from './side-bar-admin/side-bar-admin.component';



@NgModule({
  declarations: [AdminHomeComponent, AdminComponentComponent,SidebarComponent, SideBarAdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,SharedModule
  ]
})
export class AdminModule { }
