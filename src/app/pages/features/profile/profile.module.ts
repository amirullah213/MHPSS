import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile-component/profile.component';
import { FormsModule } from '@angular/forms';
import { ProfileService } from './service'


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule
  ],
  providers:[ProfileService]
})
export class ProfileModule { }
