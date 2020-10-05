import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService, AuthService, APP_CONFIG } from '../../../../core';

@Component({
  selector: 'ncri-print-presc',
  templateUrl: './print-presc.component.html',
  styleUrls: ['./print-presc.component.scss']
})
export class PrintPrescComponent implements OnInit {
  param:any ={};
  userLoader:boolean = false;
  userList:any=[];
  uPresData:any ={};
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.uPresData= JSON.parse(localStorage.getItem("uPresData"));
    console.log('uPresData====',this.uPresData)
    this.getPatPrescrib(this.uPresData);
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
           console.log('userPresc list===',this.userList)
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