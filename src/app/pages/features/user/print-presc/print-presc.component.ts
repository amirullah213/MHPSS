import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService, AuthService, APP_CONFIG } from '../../../../core';

@Component({
  selector: 'ncri-print-presc',
  templateUrl: './print-presc.component.html',
  styleUrls: ['./print-presc.component.scss']
})
export class PrintPrescComponent implements OnInit {

  printPage() {
    window.print();
  }
  
  param:any ={};
  userLoader:boolean = false;
  userList:any=[];
  patInfo:any ={};
  diagnosisArr:any=[];
  daig:any=[];

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.patInfo= JSON.parse(localStorage.getItem("patData"));
    console.log('patInfo2====',this.patInfo)
    this.getPatPrescrib(this.patInfo);
  }

    //patient prescription list
    getPatPrescrib(obj:any) {
      this.param={'crp':obj.token,'hospitalID':obj.hospitalID};
      
       this.userLoader = true;
       this.auth.getOpdTicket(this.param).subscribe
       ((response:any)=> {
       if(response.status === 0 ){
           console.log(response );
           this.userList = response.data;
           console.log('userPresc list===',this.userList);
           console.log('userPresc list===',JSON.parse(this.userList[0].test[2].xrayFilms6) );
           this.diagnosisArr=JSON.parse(this.userList[0].test[2].xrayFilms6)
           this.diagnosisArr.forEach(function (value) {
            console.log("diagnosisArr",value);
           // this.daig.push(value);
           // console.log("this.daig",this.daig);
           })
          this.userLoader = false;
         } else {
           this.userLoader = false;
           alert('Something went wrong try again');
         }
       },
       (error) => {}
     );
   }
 // patient prescription list

}
