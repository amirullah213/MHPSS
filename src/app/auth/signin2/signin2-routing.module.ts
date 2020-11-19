import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorSinginComponent } from './doctor-singin/doctor-singin.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorSinginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Signin2RoutingModule { }
