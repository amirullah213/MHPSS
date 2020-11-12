import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {epiService} from "../epi.serivce"
@Component({
  selector: 'ncri-child-vaccination',
  templateUrl: './child-vaccination.component.html',
  styleUrls: ['./child-vaccination.component.scss']
})
export class ChildVaccinationComponent implements OnInit {
  patInfo: any={};
  userLoader: boolean;
  paramData: any={};
  detail: any={};
  epiData: any=[{"sr": 1,
  "when": "At Birth",
  "age": "At Birth",
  "vaccines": "BCG,OPV-0,Hep-B",
  "action":1,
  "nextVisit": "After 6 weeks of 1st visit",
  "vaccineDate": "0000",
  "status":0,
  "id":''}
,
{"sr":2 ,
    "when": "2nd Visit",
    "age": "6 Weeks",
    "vaccines": "OPV-1, Rotavirus-I, Pneumococcal-I, Pentavalent-I",
    "action":"",
    "nextVisit": "After 4 weeks of 2nd visit",
    "vaccineDate": "0000",
    "status":0,
    "id":''},
    {"sr": 3,
    "when": "3rd Visit",
    "age": "10 Weeks",
    "vaccines": "OPV-II, Rotavirus-II, Pneumococcal-II, Pentavalent-II",
    "action":"", 
     "nextVisit": "After 4 weeks of 3rd visit",
    "vaccineDate": "0000",
  "status":0,
  "id":''}
  ,
  {"sr": 4,
  "when": "4th Visit",
  "age": "14 Weeks",
  "vaccines": "OPV-III,Rotavirus-III,Pneumococcal-III,Pentavalent-III",
  "action":"",
  "nextVisit": "After 5 months of 4th visit",
  "vaccineDate": "0000",
  "status":0,
  "id":''},
  {"sr": 5,
  "when": "5th Visit",
  "age": "9 Months",
  "vaccines": "Measles-I",
  "action":"",
  "nextVisit": "After 6 months of 5th visit",
  "vaccineDate": "0000",
  "status":0,
  "id":''},
  {"sr": 6,
  "when": "6th Visit",
  "age": "15 Months",
  "nextVisit": "",
  "vaccines": "Measles-II",
  "action":"",
  "vaccineDate": "",
  "status":0,
"id":''}];
  epiRes: any=[];
  adData: any;

  constructor(  private eService: epiService,
    private router: Router) { }

  ngOnInit(): void {
    this.patInfo =JSON.parse(localStorage.getItem("patData"));
    this.detail =JSON.parse(localStorage.getItem("details"));

    this.getchildrenepischedule();
  }
  getchildrenepischedule(){

    this.userLoader=true;
    this.paramData= {"tokenID":this.patInfo.token,"hospitalID":this.detail.hospitalID,"patientID":this.patInfo.patientID,"departmentID":this.patInfo.departmentID}

    this.eService.getchildrenepischedule(this.paramData).subscribe((response: any) => {
      if (response.status == 0) {
        this.epiRes = response.data
        debugger
        if(this.epiRes.length==0)
        {         
          this.epiData[0].action=1
          // this.epiData[0].nextVisit ="After 6 weeks of 1st visit"        
          // this.epiData[0].vaccineDate =""        

        }else{
    

          this.epiData[0].status=this.epiRes[0].status
          this.epiData[0].id=this.epiRes[0].id
          if(this.epiData[0].status==1)
          this.epiData[1].action=1
          this.epiData[0].nextVisit =this.epiRes[0].nextVisit
          this.epiData[0].vaccineDate =this.epiRes[0].vaccineDate
        }
      if(this.epiRes.length==0)
          { 
          // this.epiData[1].nextVisit ="After 4 weeks of 2nd visit"
          // this.epiData[1].vaccineDate =""
          }else{
            this.epiData[1].status=this.epiRes[1].status
            this.epiData[1].id=this.epiRes[1].id
            if(this.epiData[1].status==1)
            this.epiData[2].action=1          
            this.epiData[1].nextVisit =this.epiRes[1].nextVisit
            this.epiData[1].vaccineDate =this.epiRes[1].vaccineDate
          }
      if(this.epiRes.length==0)
          {  
          // this.epiData[2].nextVisit ="After 4 weeks of 3rd visit"
          // this.epiData[2].vaccineDate =""
        }else{
          this.epiData[2].status=this.epiRes[2].status
          this.epiData[2].id=this.epiRes[2].id
          if(this.epiData[2].status==1)
          this.epiData[3].action=1    
          this.epiData[2].nextVisit =this.epiRes[2].nextVisit
          this.epiData[2].vaccineDate =this.epiRes[2].vaccineDate
        } 
      if(this.epiRes.length==0)
          { 
          // this.epiData[3].nextVisit ="After 5 months of 4th visit"
          // this.epiData[3].vaccineDate =""
        }else{
          this.epiData[3].status=this.epiRes[3].status
          this.epiData[3].id=this.epiRes[3].id
          if(this.epiData[3].status==1)
          this.epiData[4].action=1
      
          this.epiData[3].nextVisit =this.epiRes[3].nextVisit
          this.epiData[3].vaccineDate =this.epiRes[3].vaccineDate
        }
      
  
      if(this.epiRes.length==0 && this.epiData[4].vaccineDate=="0000"){
          // this.epiData[4].nextVisit ="After 6 months of 5th visit"
          // this.epiData[4].vaccineDate =""
          }else{
            this.epiData[4].status=this.epiRes[4].status
            this.epiData[4].id=this.epiRes[4].id
            if(this.epiData[1].action==1 || this.epiData[2].action==1 || this.epiData[3].action==1)
            {
            this.epiData[4].action=1
            }else{
              this.epiData[4].action=0

            }
      
            this.epiData[4].nextVisit =this.epiRes[4].nextVisit
            this.epiData[4].vaccineDate =this.epiRes[4].vaccineDate
          }
      if(this.epiRes.length==0 && this.epiData[5].nextVisit=="0000"){
          // this.epiData[5].nextVisit =""
          // this.epiData[5].vaccineDate =""
          }else{
            this.epiData[5].status=this.epiRes[5].status
            this.epiData[5].id=this.epiRes[5].id
            if(this.epiData[4].status==1)
           { 
             this.epiData[5].action=1
           }else{
            this.epiData[5].action=0

           }
//            this.epiData[5].action=1
            this.epiData[5].nextVisit =this.epiRes[5].nextVisit
            this.epiData[5].vaccineDate =this.epiRes[5].vaccineDate
          }  
                this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
  }
  addchildrenepischedule(){
    
    this.userLoader=true;
    this.paramData= {"tokenID":this.patInfo.ptID,"hospitalID":this.patInfo.hospitalID,"patientID":this.patInfo.patientID,"departmentID":this.patInfo.departmentID}
    
    this.eService.addchildrenepischedule(this.paramData).subscribe((response: any) => {
      if (response.status == 0) {
        location.reload()
        this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
  }

  updatechildrenepischedule(id:any){

    this.userLoader=true;
    this.paramData= {"id":id,"hospitalID":this.detail.hospitalID}

    this.eService.updatechildrenepischedule(this.paramData).subscribe((response: any) => {
      if (response.status == 0) {
        debugger
      location.reload()

        this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
  }
 
  funcCall(i,id){
    
if(i==0)
{
  this.addchildrenepischedule()
}else{
  
 this.updatechildrenepischedule(id)
}
  }

}
