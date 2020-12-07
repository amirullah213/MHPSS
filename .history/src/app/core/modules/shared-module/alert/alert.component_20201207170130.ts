import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ncri-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  showAlert:boolean=false;
  alerts:any={};
  constructor() { }

  ngOnInit(): void {

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
}
