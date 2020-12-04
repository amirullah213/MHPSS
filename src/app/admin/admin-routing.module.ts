import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponentComponent } from './admin-component/admin-component.component'
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DiagnosticListComponent } from './diagnostic-list/diagnostic-list.component';
import { PathologyListComponent } from './pathology-list/pathology-list.component';
import { RadiologyListComponent } from './radiology-list/radiology-list.component'
import { PharmcyComponent } from './pharmcy/pharmcy.component'
import { AmbulanceComponent } from './ambulance/ambulance.component'
import { ComplaintsComponent } from './complaints/complaints.component';
import { SignsComponent } from './signs/signs.component';
import { EmrSummaryReportComponent } from './emr-summary-report/emr-summary-report.component';
import { syncDataComponent } from './syncData/syncData.component';

const routes: Routes = [

  {
    path: '',
    component: AdminComponentComponent,
    children: [

      // { path: 'updatepassword', loadChildren: () => import('./features/update_pass/update_password.module').then(m => m.UpdatePasswordModule) },
      { path: 'home', component: AdminHomeComponent },
      { path: 'diagnostic-list', component: DiagnosticListComponent },
      { path: 'pathology-list', component: PathologyListComponent },
      { path: 'radiology-list', component: RadiologyListComponent },
      { path: 'pharmacy', component: PharmcyComponent },
      { path: 'ambulance', component: AmbulanceComponent },
      { path: 'signs', component: SignsComponent },
      { path: 'complaints', component: ComplaintsComponent },
      { path: 'emrsummaryreport', component: EmrSummaryReportComponent },
      { path: 'syncData', component: syncDataComponent },

      { path: '', redirectTo: 'home', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
