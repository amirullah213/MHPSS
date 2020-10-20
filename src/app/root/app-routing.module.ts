import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard, SessionGuard } from '../core';
import { AuthGuard } from '../core/guards/auth.guard';
import { PathologyGuard } from '../lab-pathology/pathology.guard';

// , canActivate: [SessionGuard]
const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  // { path: '',  loadChildren: () => import('../auth/signin/signin.module').then(m => m.SigninModule)},
  { path: 'doctor', loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule),canActivate : [AuthGuard]},
  { path: 'lab-path', loadChildren: () => import('../lab-pathology/lab-pathol.module').then(m => m.LabPatholModule),canActivate : [PathologyGuard]},
  { path: 'reception', loadChildren: () => import('../reception/reception.module').then(m => m.ReceptionModule)},
  { path: 'lab-rad', loadChildren: () => import('../rad-radiology/radiology.module').then(m => m.RadiologyModule)},
  { path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)},
  { path: 'pharma', loadChildren: () => import('../pharmacy/pharmacy.module').then(m => m.PharmacyModule)},
  { path: 'signin', loadChildren: () => import('../auth/signin/signin.module').then(m => m.SigninModule) },
  { path: 'docsignin', loadChildren: () => import('../auth/signin2/signin2.module').then(m => m.Signin2Module) },
  { path: 'signup', loadChildren: () => import('../auth/signup/signup.module').then(m => m.SignupModule)},
  { path: 'recovery', loadChildren: () => import('../auth/recovery/recovery.module').then(m => m.RecoveryModule)},
  { path: 'ward-list', loadChildren: () => import('../ward/ward.module').then(m => m.WardModule) },
  { path: 'ot', loadChildren: () => import('../operation/operation.module').then(m => m.OperationModule) },
  { path: 'epi', loadChildren: () => import('../epi/epi.module').then(m => m.EpiModule) },
  { path: 'vitals', loadChildren: () => import('../vitals/vitals.module').then(m => m.VitalsModule) },
  { path: 'fleet', loadChildren: () => import('../fleet/Fleet.module').then(m => m.FleetModule) },
  { path: '**', redirectTo: '' }
  
 
  // {path: '', loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule)},
  // {path: 'signin', loadChildren: () => import('../auth/signin/signin.module').then(m => m.SigninModule)},
  // { path: 'signup', loadChildren: () => import('../auth/signup/signup.module').then(m => m.SignupModule)},
  // { path: 'recovery', loadChildren: () => import('../auth/recovery/recovery.module').then(m => m.RecoveryModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
