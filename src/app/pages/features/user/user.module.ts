import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsersComponent } from './users-component/users.component';
import { CreateUserComponent } from './create-user-component/create-user.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ChangePasswordComponent } from './change-password-component/change-password.component';


@NgModule({
  declarations: [UsersComponent, CreateUserComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    FormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [UserService]
})
export class UserModule { }
