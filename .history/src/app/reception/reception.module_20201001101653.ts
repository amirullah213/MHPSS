import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReceptionRoutingModule } from './reception-routing.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceptionComponent } from './reception/reception.component';
import { SharedModule, Interceptor } from '../core';



@NgModule({
  declarations: [HomeComponent, ReceptionComponent],
  imports: [
    CommonModule,
    ReceptionRoutingModule, FormsModule,ReactiveFormsModule,SharedModule
  ]
})
export class ReceptionModule { }
