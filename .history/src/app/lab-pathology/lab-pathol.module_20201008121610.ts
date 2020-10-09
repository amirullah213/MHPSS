import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../core';
import { LabPatholRoutingModule } from './lab-pathol-routing.module';
import { LabPathComponent } from './lab-path/lab-path.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [LabPathComponent, HomeComponent],
  imports: [
    CommonModule,
    LabPatholRoutingModule,SharedModule
  ]
})
export class LabPatholModule { }
