import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard, SessionGuard } from '../core';
import { AuthGuard } from '../core/guards/auth.guard';

// , canActivate: [AuthGuard]
// , canActivate: [SessionGuard]
const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  // { path: '',  loadChildren: () => import('../auth/signin/signin.module').then(m => m.SigninModule)},
  { path: 'doctor', loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule),canActivate : [AuthGuard]},
  { path: 'lab-path', loadChildren: () => import('../lab-pathology/lab-pathol.module').then(m => m.LabPatholModule)},
  { path: 'reception', loadChildren: () => import('../reception/reception.module').then(m => m.ReceptionModule)},
  { path: 'radiology', loadChildren: () => import('../rad-radiology/radiology.module').then(m => m.RadiologyModule)},

  { path: 'signin', loadChildren: () => import('../auth/signin/signin.module').then(m => m.SigninModule)},
  { path: 'signup', loadChildren: () => import('../auth/signup/signup.module').then(m => m.SignupModule)},
  { path: 'recovery', loadChildren: () => import('../auth/recovery/recovery.module').then(m => m.RecoveryModule)},
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
