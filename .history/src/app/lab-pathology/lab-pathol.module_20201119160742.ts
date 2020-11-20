import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../core';
import { ReactiveFormsModule } from '@angular/forms';
import { LabPatholRoutingModule } from './lab-pathol-routing.module';
import { LabPathComponent } from './lab-path/lab-path.component';
import { HomeComponent } from './home/home.component';
import { SideBarPathologyComponent } from './side-bar-pathology/side-bar-pathology.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DiagnosticsPathologyComponent } from './diagnostics-pathology/diagnostics-pathology.component';
import { DiagnosticsPathologySeenComponent } from './diagnostics-pathology-seen/diagnostics-pathology-seen.component';
import { Pending2Component } from './pending2/pending2.component';


@NgModule({
  declarations: [LabPathComponent, HomeComponent, SideBarPathologyComponent, DiagnosticsPathologyComponent, DiagnosticsPathologySeenComponent, Pending2Component],
  imports: [
    LabPatholRoutingModule, CommonModule, SharedModule,ReactiveFormsModule, DataTablesModule, ModalModule.forRoot(), FormsModule, BsDatepickerModule.forRoot(), CollapseModule.forRoot(),
  ]
})
export class LabPatholModule { }
