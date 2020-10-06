import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReceptionRoutingModule } from './reception-routing.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceptionComponent } from './reception/reception.component';
import { SharedModule } from '../core';
import { NewRegisterComponent } from './new-register/new-register.component';
import { OldRegistrationComponent } from './old-registration/old-registration.component';



@NgModule({
  declarations: [HomeComponent, ReceptionComponent, NewRegisterComponent, OldRegistrationComponent],
  imports: [
    CommonModule,
    ReceptionRoutingModule, FormsModule,ReactiveFormsModule,SharedModule
  ]
})
export class ReceptionModule { }
