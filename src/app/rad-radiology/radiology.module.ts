import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadiologyRoutingModule } from './radiology-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RadiologyRoutingModule
  ]
})
export class RadiologyModule { }
