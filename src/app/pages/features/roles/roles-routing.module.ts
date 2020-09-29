import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles-component/roles.component';
import { CreateRoleComponent } from './create-role-component/create-role.component';
import { UserRolesComponent } from './user-roles-component/user-roles.component';
import { SystemRolesComponent } from './system-roles-component/system-roles.component';



const routes: Routes = [
  {path:'', component: RolesComponent},
  {path:'add', component: CreateRoleComponent},
  {path:'user', component: UserRolesComponent},
  {path:'system', component: SystemRolesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes), BsDropdownModule.forRoot()],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
