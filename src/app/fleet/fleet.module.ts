import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetRoutingModule } from './fleet-routing.module';
import { FleetComponent } from './fleet/fleet.component';
import { HomeComponent } from './home/home.component';
import { FleetSideBarComponent } from './fleet-side-bar/fleet-side-bar.component';


@NgModule({
  declarations: [FleetComponent, HomeComponent, FleetSideBarComponent],
  imports: [
    CommonModule,
    FleetRoutingModule
  ]
})
export class FleetModule { }
