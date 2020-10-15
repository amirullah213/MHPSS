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

import { VitalsRoutingModule } from './vitals-routing.module';
import { HomeComponent } from './home/home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { VitalsComponent } from './vitals/vitals.component';


@NgModule({
  declarations: [HomeComponent, SideBarComponent, VitalsComponent],
  imports: [
    CommonModule,
    VitalsRoutingModule, ReactiveFormsModule, SharedModule, DataTablesModule, ModalModule.forRoot(), FormsModule, BsDatepickerModule.forRoot(), CollapseModule.forRoot(),
  ]
})
export class VitalsModule { }
