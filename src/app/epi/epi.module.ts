import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EPIRoutingModule } from './epi-routing.module';
import { EPIComponent } from './epi.component';
import { EpiComponent } from './epi/epi.component';


@NgModule({
  declarations: [EPIComponent, EpiComponent],
  imports: [
    CommonModule,
    EPIRoutingModule
  ]
})
export class EPIModule { }
