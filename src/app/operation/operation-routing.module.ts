import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationComponent } from './operation/operation.component';


const routes: Routes = [{ path: '', component: OperationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
