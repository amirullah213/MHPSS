import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OtComponent } from './ot/ot.component';
import { PendingPatientsComponent } from './pending-patients/pending-patients.component';
import { SeenPatientsComponent } from './seen-patients/seen-patients.component';


const routes: Routes = [{
  path: '', component: OtComponent,
  children: [
    { path: 'home', component: HomeComponent },
    { path: 'pending', component: PendingPatientsComponent },
    { path: 'seen', component: SeenPatientsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }

  ] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
