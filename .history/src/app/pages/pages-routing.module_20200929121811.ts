import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages-component/pages.component';


const routes: Routes = [
  {
    path: 'doctor',
    component: PagesComponent,
    children: [
        { path: '', redirectTo: 'doctor' },
        // { path: 'updatepassword', loadChildren: () => import('./features/update_pass/update_password.module').then(m => m.UpdatePasswordModule) },
        { path: 'doctor', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) },
        { path: 'role', loadChildren: () => import('./features/roles/roles.module').then(m => m.RolesModule) },
        { path: 'group', loadChildren: () => import('./features/groups/groups.module').then(m => m.GroupsModule) },
        { path: 'commission', loadChildren: () => import('./features/commission/commission.module').then(m => m.CommissionModule) },
        { path: 'account-settings', loadChildren: () => import('./features/account-settings/account-settings.module').then(m => m.AccountSettingsModule) },
        { path: 'settings', loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule) },
        { path: 'profile', loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule) }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
