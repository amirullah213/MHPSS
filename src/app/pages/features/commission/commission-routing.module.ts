import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommissionComponent } from './commission-component/commission.component';
import { CommissionDetailComponent } from './commission-detail-component/commission-detail.component';


const routes: Routes = [
  {path:'', component: CommissionComponent},
  {path:'detail', component: CommissionDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionRoutingModule { }
