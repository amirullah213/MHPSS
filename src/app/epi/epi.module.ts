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
import {NgxPrintModule} from 'ngx-print';

import { EpiRoutingModule } from './epi-routing.module';
import { EpiComponent } from './epi/epi.component';
import { HomeComponent } from './home/home.component';
import { ChildVaccinationComponent } from './child-vaccination/child-vaccination.component';
import { TTVaccinationComponent } from './tt-vaccination/tt-vaccination.component';
import { EpiSideBarComponent } from './epi-side-bar/epi-side-bar.component';


@NgModule({
  declarations: [EpiComponent, HomeComponent, ChildVaccinationComponent, TTVaccinationComponent, EpiSideBarComponent],
  imports: [
    EpiRoutingModule, CommonModule, NgxPrintModule, ReactiveFormsModule, SharedModule, DataTablesModule, ModalModule.forRoot(), FormsModule, BsDatepickerModule.forRoot(), CollapseModule.forRoot(),
  ]
})
export class EpiModule { }
