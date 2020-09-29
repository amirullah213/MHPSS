import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard, SessionGuard } from '../core';

// , canActivate: [AuthGuard]
// , canActivate: [SessionGuard]
const routes: Routes = [
  { path: '', redirectTo: 'signin' },
  // {path: '', loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule)},
  {path: 'signin', loadChildren: () => import('../auth/signin/signin.module').then(m => m.SigninModule)},
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
