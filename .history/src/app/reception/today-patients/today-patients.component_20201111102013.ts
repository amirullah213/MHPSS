import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { Router } from "@angular/router";

import { ReceptServiceService } from '../services/recept-service.service';

@Component({
  selector: 'ncri-today-patients',
  templateUrl: './today-patients.component.html',
  styleUrls: ['./today-patients.component.scss']
})
export class TodayPatientsComponent implements OnInit {

  filterTerm: string;
  hospitalID:any;
  todayData:any;
  loaderDoc:boolean=false;
  model:any={};
  docResponseArray:any=[];
  errormsg:any;

  constructor( private receptService: ReceptServiceService,private router: Router,){
      
  }
 
  

  ngOnInit(): void {
    this.hospitalID= localStorage.getItem('hospitalID');
    this.todayData=formatDate(new Date(), 'yyyy-MM-dd', 'en')
   console.log('date now==',this.todayData) ;
   this.getPatCount();
  }
   //--------------------get doctor list 
   getPatCount() {
   
    this.loaderDoc= true;
    // this.model.hospitalID=this.hospitalID;
    // this.model.date=this.todayData;
    
    console.log('model ==', this.model);
    this.receptService.getTodayPatinets(this.model).subscribe(
      (response: any) => {
        if (response.status === 0) {
         
           this.docResponseArray=response.data;
           console.log('pats list==',this.docResponseArray);
           this.loaderDoc = false;
          
        }
    if (response.status === 1) {
          this.errormsg = response.error;
          this.loaderDoc = false;
          alert('Problem in service! please Try again')
          console.log('error=', this.errormsg);
          
        }
      },
      (error) => {}
    );
  
  }
  gotoPrintPage(toknData){
          console.log("pats==",toknData)
          localStorage.setItem('tokenDetails',JSON.stringify(toknData));
          this.router.navigate(['reception/print-token2'])
  }

}

