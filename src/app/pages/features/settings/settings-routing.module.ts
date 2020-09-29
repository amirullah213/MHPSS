import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeLogoComponent } from './change-logo-component/change-logo.component';

const routes: Routes = [
  {path: '', redirectTo: 'change-logo'},
  {path: 'change-logo', component: ChangeLogoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
