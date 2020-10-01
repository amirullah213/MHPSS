import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import { SharedModule } from '../core';


@NgModule({
  declarations: [AdminHomeComponent, AdminComponentComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,SharedModule
  ]
})
export class AdminModule { }
