import { Component, OnInit } from '@angular/core';

import {formatDate} from '@angular/common';



@Component({
  selector: 'ncri-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  myDate:any = new Date();
  constructor(){
      
  }
 
  

  ngOnInit(): void {
   console.log('date now==',formatDate(new Date(), 'yyyy-MM-dd', 'en')) ;
  }

}
