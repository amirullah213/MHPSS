import { Component, OnInit } from '@angular/core';

import {formatDate} from '@angular/common';
import { ReceptServiceService } from '../services/recept-service.service';



@Component({
  selector: 'ncri-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  hospitalID:any;
  todayData:any;
  loaderDoc:boolean=false;
  model:any={};
  docResponseArray:any=[];
  errormsg:any;

  constructor( private receptService: ReceptServiceService,){
      
  }
 
  

  ngOnInit(): void {
    this.hospitalID= localStorage.getItem('hospitalID');
    this.todayData=formatDate(new Date(), 'yyyy-MM-dd', 'en')
   console.log('date now==',this.todayData) ;
  }
   //--------------------get doctor list 
   getAllDoctros() {
   
    this.loaderDoc= true;
    this.model.hospitalID=this.hospitalID;
    this.model.datedate=this.todayData;
    
    console.log('model ==', this.model);
    this.receptService.getPatsList(this.model).subscribe(
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

}
