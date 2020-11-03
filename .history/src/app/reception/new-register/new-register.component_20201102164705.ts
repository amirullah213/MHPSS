import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ncri-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.scss']
})
export class NewRegisterComponent implements OnInit {
tokenData:any={};
  constructor() { }

  ngOnInit(): void {
    this.tokenData=  JSON.parse(localStorage.getItem('tokenDetails')) ;
    
  }

}
