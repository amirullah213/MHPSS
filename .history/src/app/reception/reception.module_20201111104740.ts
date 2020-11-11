import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../core';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReceptionRoutingModule } from './reception-routing.module';
import { HomeComponent } from './home/home.component';
import { ReceptionComponent } from './reception/reception.component';
import { NewRegisterComponent } from './new-register/new-register.component';
import { OldRegistrationComponent } from './old-registration/old-registration.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PatientsComponent } from './patients/patients.component';
import { SideBarReceptionComponent } from './side-bar-reception/side-bar-reception.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TodayPatientsComponent } from './today-patients/today-patients.component';
import { Print2Component } from './print2/print2.component';





@NgModule({
  declarations: [HomeComponent, ReceptionComponent, NewRegisterComponent, OldRegistrationComponent, PatientsComponent, SideBarReceptionComponent, TodayPatientsComponent, Print2Component],
  imports: [
    CommonModule, ReceptionRoutingModule, FormsModule, Ng2SearchPipeModule, ReactiveFormsModule, SharedModule, DataTablesModule, ModalModule.forRoot(), BsDatepickerModule.forRoot(), CollapseModule.forRoot()
  ]
})
export class ReceptionModule { }
