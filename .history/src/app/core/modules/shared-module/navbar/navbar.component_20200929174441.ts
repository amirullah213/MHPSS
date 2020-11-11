import { Component, OnInit, Inject } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'ncri-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document,private global: GlobalService) { }

  ngOnInit(): void {
  }
  //log out
  logout() {
    this.global.logOut();
  }
  //theme change
  openDrawer() {
    const drawer = this.document.querySelector('.ncri-drawer');
    drawer.classList.add('open');
  }
}
