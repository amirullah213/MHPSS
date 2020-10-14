import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { HomeComponent } from './home/home.component';
import { OperationSideBarComponent } from './operation-side-bar/operation-side-bar.component';
import { OtComponent } from './ot/ot.component';


@NgModule({
  declarations: [HomeComponent, OperationSideBarComponent, OtComponent],
  imports: [
    CommonModule,
    OperationRoutingModule
  ]
})
export class OperationModule { }
