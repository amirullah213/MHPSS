
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles-component/roles.component';
import { CreateRoleComponent } from './create-role-component/create-role.component';
import { UserRolesComponent } from './user-roles-component/user-roles.component';
import { SystemRolesComponent } from './system-roles-component/system-roles.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';




@NgModule({
  declarations: [RolesComponent, CreateRoleComponent, UserRolesComponent, SystemRolesComponent],
  imports: [
    
    AccordionModule.forRoot(),
    CommonModule,
    RolesRoutingModule,
    NgxBootstrapMultiselectModule
    

  ]
})
export class RolesModule { }
