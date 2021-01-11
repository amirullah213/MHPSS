import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReceptionComponent } from './reception/reception.component';
import { NewRegisterComponent } from './new-register/new-register.component';
import { OldRegistrationComponent } from './old-registration/old-registration.component';
import { PatientsComponent } from './patients/patients.component';
import { TodayPatientsComponent } from './today-patients/today-patients.component';
import { Print2Component } from './print2/print2.component';
import { PrintRadiologyComponent } from './print-radiology/print-radiology.component';
const routes: Routes = [
  {
    path: '',
    component: ReceptionComponent,
    children: [
       
      // { path: 'updatepassword', loadChildren: () => import('./features/update_pass/update_password.module').then(m => m.UpdatePasswordModule) },
      { path: 'home', component: HomeComponent },
      { path: 'print-token', component: NewRegisterComponent },
      { path: 'old-regis', component: OldRegistrationComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'today-patients', component: TodayPatientsComponent },
      { path: 'print2', component: Print2Component },
      { path: 'printRad', component: PrintRadiologyComponent },
      
      { path : '', redirectTo : 'home', pathMatch : 'full' }
        
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
