import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { Router } from "@angular/router";

import { ReceptServiceService } from '../services/recept-service.service';

@Component({
  selector: 'ncri-print2',
  templateUrl: './print2.component.html',
  styleUrls: ['./print2.component.scss']
})
export class Print2Component implements OnInit {

  printPage() {
    window.print();
  }
tokenData:any={};
loginDetails:any={};
  constructor() { }

  ngOnInit(): void {
    this.loginDetails=JSON.parse(localStorage.getItem('details')) ;
    this.tokenData=  JSON.parse(localStorage.getItem('token2Details')) ;
    console.log(' this.tokenData', this.tokenData)
  }

}
