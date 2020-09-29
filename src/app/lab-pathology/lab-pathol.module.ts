import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabPatholRoutingModule } from './lab-pathol-routing.module';
import { LabPathComponent } from './lab-path/lab-path.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [LabPathComponent, HomeComponent],
  imports: [
    CommonModule,
    LabPatholRoutingModule
  ]
})
export class LabPatholModule { }
