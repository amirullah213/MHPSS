import { Component, OnInit } from '@angular/core';

import {formatDate} from '@angular/common';



@Component({
  selector: 'ncri-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  hospitalID:any;
  todayData:any;
  constructor(){
      
  }
 
  

  ngOnInit(): void {
    this.hospitalID= localStorage.getItem('hospitalID');
    this.todayData=formatDate(new Date(), 'yyyy-MM-dd', 'en')
   console.log('date now==',this.todayData) ;
  }

}
