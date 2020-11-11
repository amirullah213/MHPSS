import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Signin2RoutingModule } from './signin2-routing.module';
import { DoctorSinginComponent } from './doctor-singin/doctor-singin.component';


@NgModule({
  declarations: [DoctorSinginComponent],
  imports: [
    CommonModule,
    Signin2RoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class Signin2Module { }
