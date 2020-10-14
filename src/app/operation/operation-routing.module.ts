import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtComponent } from './ot/ot.component';
import { OperationComponent } from './operation/operation.component';


const routes: Routes = [{ path: '', component: OtComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
