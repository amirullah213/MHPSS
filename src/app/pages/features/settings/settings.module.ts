import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { ChangeLogoComponent } from './change-logo-component/change-logo.component';


@NgModule({
  declarations: [ChangeLogoComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,ReactiveFormsModule,FormsModule
  ]
})
export class SettingsModule { }
