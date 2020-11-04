import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VitalsComponent } from './vitals/vitals.component';
import { NewPatientsComponent } from './new-patients/new-patients.component';

const routes: Routes = [
  {
    path: '',
    component: VitalsComponent,
    children: [
      { path: 'home', component: NewPatientsComponent },
      { path: 'vitals', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VitalsRoutingModule { }
