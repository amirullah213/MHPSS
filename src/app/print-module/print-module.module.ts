import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintModuleRoutingModule } from './print-module-routing.module';
import { HomeComponent } from './home/home.component';
import { PrintComponent } from './print/print.component';
import { PrintSideBarComponent } from './print-side-bar/print-side-bar.component';
import { RadiologyComponent } from './radiology/radiology.component';
import { PathologyComponent } from './pathology/pathology.component';
import { DischargeCardComponent } from './discharge-card/discharge-card.component';


@NgModule({
  declarations: [HomeComponent, PrintComponent, PrintSideBarComponent, RadiologyComponent, PathologyComponent, DischargeCardComponent],
  imports: [
    CommonModule,
    PrintModuleRoutingModule
  ]
})
export class PrintModuleModule { }
