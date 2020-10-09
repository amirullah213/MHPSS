import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LabPathComponent } from './lab-path/lab-path.component'
import { HomeComponent } from './home/home.component'
const routes: Routes = [
  {
    path: '',
    //component: LabPathComponent,
    children: [
       
        // { path: 'updatepassword', loadChildren: () => import('./features/update_pass/update_password.module').then(m => m.UpdatePasswordModule) },
        { path: 'home', component: HomeComponent },
        { path : '', redirectTo : 'home', pathMatch : 'full' }
        
    ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabPatholRoutingModule { }
