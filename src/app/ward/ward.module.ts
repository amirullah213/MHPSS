import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WardRoutingModule } from './ward-routing.module';
import { WardComponent } from './ward.component';


@NgModule({
  declarations: [WardComponent],
  imports: [
    CommonModule,
    WardRoutingModule
  ]
})
export class WardModule { }
