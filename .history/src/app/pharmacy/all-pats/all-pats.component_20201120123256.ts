import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { Router } from "@angular/router";

import { PharmacyServicesService } from '../services/pharmacy-services.service';

@Component({
  selector: 'ncri-all-pats',
  templateUrl: './all-pats.component.html',
  styleUrls: ['./all-pats.component.scss']
})
export class AllPatsComponent implements OnInit {
  filterTerm: string;
  hospitalID:any;
  todayData:any;
  loaderDoc:boolean=false;
  model:any={};
  docResponseArray:any=[];
  errormsg:any;

  constructor( private pharmaService: PharmacyServicesService,private router: Router,){
      
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
    this.pharmaService.getTodayPatinets(this.model).subscribe(
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
          localStorage.setItem('token2Details',JSON.stringify(toknData));
          this.router.navigate(['reception/print2'])
  }

}






// gotoPrintPage(){
//   //this.modalRef.hide();
//   //this.router.navigate(['/print/pathology']);
//   window.open('/print/home')
  
// }