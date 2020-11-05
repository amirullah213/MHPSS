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

import { FleetRoutingModule } from './fleet-routing.module';
import { FleetComponent } from './fleet/fleet.component';
import { HomeComponent } from './home/home.component';
import { FleetSideBarComponent } from './fleet-side-bar/fleet-side-bar.component';
import { NewPatientsComponent } from './new-patients/new-patients.component';
import { PendingPatientsComponent } from './pending-patients/pending-patients.component';
import { AllAmbulancesComponent } from './all-ambulances/all-ambulances.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';      

@NgModule({
  declarations: [FleetComponent, HomeComponent, FleetSideBarComponent, NewPatientsComponent, PendingPatientsComponent, AllAmbulancesComponent],
  imports: [
    CommonModule,    TypeaheadModule.forRoot(), 
    FleetRoutingModule, ReactiveFormsModule, SharedModule, DataTablesModule, ModalModule.forRoot(), FormsModule, BsDatepickerModule.forRoot(), CollapseModule.forRoot(),
  ]
})
export class FleetModule { }
