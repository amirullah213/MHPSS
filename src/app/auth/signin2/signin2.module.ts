import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Signin2RoutingModule } from './signin2-routing.module';
import { DoctorSinginComponent } from './doctor-singin/doctor-singin.component';


@NgModule({
  declarations: [DoctorSinginComponent],
  imports: [
    CommonModule,
    Signin2RoutingModule
  ]
})
export class Signin2Module { }
