import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountSettingsRoutingModule } from './account-setting-routing.module';
import { SecurityComponent } from './security-component/security.component';
import { EmailComponent } from './email-component/email.component';
import { AccountPreferenceComponent } from './account-preference-component/account-preference.component';
import { AccountSettingService } from './services/account-setting.service';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [SecurityComponent, EmailComponent, AccountPreferenceComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AccountSettingsRoutingModule,ReactiveFormsModule,
    FormsModule
  ]
})
export class AccountSettingsModule { }
