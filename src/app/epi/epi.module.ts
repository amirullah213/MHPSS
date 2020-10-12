import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EPIRoutingModule } from './epi-routing.module';
import { EpiComponent } from './epi/epi.component';


@NgModule({
  declarations: [EpiComponent],
  imports: [
    CommonModule,
    EPIRoutingModule
  ]
})
export class EPIModule { }
