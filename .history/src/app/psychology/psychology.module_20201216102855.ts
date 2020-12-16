import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsychologyRoutingModule } from './psychology-routing.module';
import { PsyHomeComponent } from './psy-home/psy-home.component';
import { PsySideBarComponent } from './psy-side-bar/psy-side-bar.component';
import { PsychologyComponent } from './psychology/psychology.component';


@NgModule({
  declarations: [PsyHomeComponent, PsySideBarComponent, PsychologyComponent],
  imports: [
    CommonModule,
    PsychologyRoutingModule
  ]
})
export class PsychologyModule { }
