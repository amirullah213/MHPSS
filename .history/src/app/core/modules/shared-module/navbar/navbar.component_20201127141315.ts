import { Component, OnInit, Inject } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'ncri-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
loginName:any;
showAlert:boolean=false;
alerts:any={};

  constructor(@Inject(DOCUMENT) private document: Document,private global: GlobalService) { }

  ngOnInit(): void {
    this.loginName=JSON.parse(localStorage.getItem('details')) ;
    console.log('this.loginName===',this.loginName);
    this.alertSuccess('success','testing message');
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
  // alert message functions
alertSuccess(typ,msg){
  this.showAlert=true;
  this.alerts = {
    type: typ,
    msg:msg,
   // timeout: 3000
  };
  this.delay();
}
alertDanger(typ,msg){
  this.showAlert=true;
  this.alerts = {
    type: typ,
    msg:msg,
    //timeout: 3000
  };
  this.delay();
}

delay(){
  console.log('this.showAlertup',this.showAlert);
  setTimeout(()=>{                           //<<<---using ()=> syntax
    console.log('this.showAlertdown',this.showAlert)
  this.showAlert=false;
  
  console.log('this.showAlertdown',this.showAlert)
}, 5000);

}
//alert message functions
}
