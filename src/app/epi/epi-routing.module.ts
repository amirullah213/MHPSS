import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EPIComponent } from './epi.component';

const routes: Routes = [{ path: '', component: EPIComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EPIRoutingModule { }
