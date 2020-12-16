import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgxPrintModule} from 'ngx-print';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { PsychologyRoutingModule } from './psychology-routing.module';
import { PsyHomeComponent } from './psy-home/psy-home.component';
import { PsySideBarComponent } from './psy-side-bar/psy-side-bar.component';
import { PsychologyComponent } from './psychology/psychology.component';


@NgModule({
  declarations: [PsyHomeComponent, PsySideBarComponent, PsychologyComponent],
  imports: [
    CommonModule,
    PsychologyRoutingModule,ReactiveFormsModule, NgxPrintModule, SharedModule, DataTablesModule, ModalModule.forRoot(), FormsModule, BsDatepickerModule.forRoot(), CollapseModule.forRoot(),
    TypeaheadModule.forRoot(),
  ]
})
export class PsychologyModule { }
