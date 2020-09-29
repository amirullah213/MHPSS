import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommissionRoutingModule } from './commission-routing.module';
import { CommissionComponent } from './commission-component/commission.component';
import { CommissionDetailComponent } from './commission-detail-component/commission-detail.component';
import { CommissionService } from './service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommissionComponent, CommissionDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommissionRoutingModule
  ],
  providers:[CommissionService]
})
export class CommissionModule { }
