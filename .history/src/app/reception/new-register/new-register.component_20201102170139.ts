import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ncri-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.scss']
})
export class NewRegisterComponent implements OnInit {
tokenData:any={};
loginDetails:any={};
  constructor() { }

  ngOnInit(): void {
    this.loginDetails=JSON.parse(localStorage.getItem('details')) ;
    this.tokenData=  JSON.parse(localStorage.getItem('tokenDetails')) ;
    
  }

}
