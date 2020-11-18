import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintModuleRoutingModule } from './print-module-routing.module';
import { HomeComponent } from './home/home.component';
import { PrintComponent } from './print/print.component';
import { PrintSideBarComponent } from './print-side-bar/print-side-bar.component';


@NgModule({
  declarations: [HomeComponent, PrintComponent, PrintSideBarComponent],
  imports: [
    CommonModule,
    PrintModuleRoutingModule
  ]
})
export class PrintModuleModule { }
