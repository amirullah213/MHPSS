import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpiComponent } from './epi/epi.component';

const routes: Routes = [{ 
  path: '', 
  component: EpiComponent,
  children: [{ path: '', component: EpiComponent }]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EPIRoutingModule { }
