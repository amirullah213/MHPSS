import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { OperationComponent } from './operation/operation.component';
import { HomeComponent } from './home/home.component';
import { OperationSideBarComponent } from './operation-side-bar/operation-side-bar.component';


@NgModule({
  declarations: [OperationComponent, HomeComponent, OperationSideBarComponent],
  imports: [
    CommonModule,
    OperationRoutingModule
  ]
})
export class OperationModule { }
