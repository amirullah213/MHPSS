import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';import { EpiComponent } from './epi/epi.component';
import { HomeComponent } from './home/home.component';
import { ChildVaccinationComponent } from './child-vaccination/child-vaccination.component';
import { TTVaccinationComponent } from './tt-vaccination/tt-vaccination.component';
import { EpiSideBarComponent } from './epi-side-bar/epi-side-bar.component';

const routes: Routes = [
  {
    path: '',
    component: EpiComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'child-vaccination', component: ChildVaccinationComponent },
      { path: 'tt-vaccination', component: TTVaccinationComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpiRoutingModule { }
