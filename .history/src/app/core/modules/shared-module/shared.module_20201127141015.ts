import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { DrawerComponent } from './drawer/drawer.component';
import { SharedService } from '../../services/shared.service';
import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ],
  declarations: [NavbarComponent, SidebarComponent, FooterComponent, DrawerComponent],
  exports: [NavbarComponent, SidebarComponent, FooterComponent, DrawerComponent,]
})

export class SharedModule { }
