import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReceptionComponent } from './reception/reception.component';
import { NewRegisterComponent } from './new-register/new-register.component';
import { OldRegistrationComponent } from './old-registration/old-registration.component';
const routes: Routes = [
  {
    path: '',
    component: ReceptionComponent,
    children: [
       
        // { path: 'updatepassword', loadChildren: () => import('./features/update_pass/update_password.module').then(m => m.UpdatePasswordModule) },
        { path: 'home', component: HomeComponent },
        { path: 'new-regis', component: NewRegisterComponent },
        { path: 'old-regis', component: OldRegistrationComponent },
        { path : '', redirectTo : 'home', pathMatch : 'full' }
        
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
