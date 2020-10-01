import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users-component/users.component';
import {PatDetailComponent} from './pat-detail-component/pat-detail.component';
import { ChangePasswordComponent } from './change-password-component/change-password.component';

const routes: Routes = [
  {path:'', component: UsersComponent},
  {path:'details', component: PatDetailComponent},
  {path:'change-password', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
