import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponentComponent} from './admin-component/admin-component.component'
import {AdminHomeComponent} from './admin-home/admin-home.component'

const routes: Routes = [

  {
    path: '',
    component: AdminComponentComponent,
    children: [
       
        // { path: 'updatepassword', loadChildren: () => import('./features/update_pass/update_password.module').then(m => m.UpdatePasswordModule) },
        { path: 'home', component: AdminHomeComponent },
        { path : '', redirectTo : 'home', pathMatch : 'full' }
        
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
