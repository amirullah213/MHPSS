import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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




@NgModule({
  declarations: [HomeComponent, ReceptionComponent, NewRegisterComponent, OldRegistrationComponent],
  imports: [
    CommonModule, ReceptionRoutingModule, FormsModule, ReactiveFormsModule, SharedModule, DataTablesModule, ModalModule.forRoot(), BsDatepickerModule.forRoot(), CollapseModule.forRoot()
  ]
})
export class ReceptionModule { }
