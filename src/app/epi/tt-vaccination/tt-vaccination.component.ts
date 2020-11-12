import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { epiService } from '../epi.serivce';

@Component({
  selector: 'ncri-tt-vaccination',
  templateUrl: './tt-vaccination.component.html',
  styleUrls: ['./tt-vaccination.component.scss']
})
export class TTVaccinationComponent implements OnInit {
  patInfo: any={};
  userLoader: boolean;
  paramData: any={};
  detail: any={};
  epiData: any=[{"sr": 1,
  "when": "At Birth",
  "age": "At Birth",
  "vaccines":  "TT-I",
  "action":1,
  "nextVisit": "any time at first contact or as early as possible during pregnancy",
  "vaccineDate": "0000",
  "status":0,
  "id":''}
,
{"sr":2 ,
    "when": "2nd Visit",
    "age": "6 Weeks",
    "vaccines": "TT-II",
    "action":"",
    "nextVisit": "One month after TT-I",
    "vaccineDate": "0000",
    "status":0,
    "id":''},
    {"sr": 3,
    "when": "3rd Visit",
    "age": "10 Weeks",
    "vaccines": "TT-III",
    "action":"", 
     "nextVisit": "Six months after TT-II or during subsequent pregnancy",
    "vaccineDate": "0000",
  "status":0,
  "id":''}
  ,
  {"sr": 4,
  "when": "4th Visit",
  "age": "14 Weeks",
  "vaccines":"TT-IV" ,
  "action":"",
  "nextVisit":"One year after TT-III or during subsequent pregnancy",
  "vaccineDate": "0000",
  "status":0,
  "id":''},
  {"sr": 5,
  "when": "5th Visit",
  "age": "9 Months",
  "vaccines":"TT-V",
  "action":"",
  "nextVisit": "one year after TT-IV or during subsequent pregnancy",
  "vaccineDate": "0000",
  "status":0,
  "id":''},
  ];
  epiRes: any=[];
  adData: any;

  constructor(  private eService: epiService,
    private router: Router) { }

  ngOnInit(): void {
    this.patInfo =JSON.parse(localStorage.getItem("patData"));
    this.detail =JSON.parse(localStorage.getItem("details"));

    this.getwomenepischedule();
  }
  getwomenepischedule(){

    this.userLoader=true;
    this.paramData= {"tokenID":this.patInfo.token,"hospitalID":this.detail.hospitalID,"patientID":this.patInfo.patientID,"departmentID":this.patInfo.departmentID}
    this.eService.getwomenepischedule(this.paramData).subscribe((response: any) => {
      if (response.status == 0) {
        this.epiRes = response.data
        debugger
        if(this.epiRes.length==0)
        {         
          // this.epiData[0].action=1
          // this.epiData[0].nextVisit ="After 6 weeks of 1st visit"        
          // this.epiData[0].vaccineDate =""        

        }else{
    

          this.epiData[0].status=this.epiRes[0].status
          this.epiData[0].id=this.epiRes[0].id
          this.epiData[0].action=0
          this.epiData[1].action=1
          this.epiData[0].nextVisit =this.epiRes[0].expectedDate
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
            this.epiData[1].nextVisit =this.epiRes[1].expectedDate
          }
      if(this.epiRes.length==0)
          {  
          //   this.epiData[2].nextVisit ="After 4 weeks of 3rd visit"
          // this.epiData[2].vaccineDate =""
        }else{
          this.epiData[2].status=this.epiRes[2].status
          this.epiData[2].id=this.epiRes[2].id
          if(this.epiData[2].status==1)
          this.epiData[3].action=1    
          this.epiData[2].nextVisit =this.epiRes[2].expectedDate
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
          this.epiData[3].nextVisit =this.epiRes[3].expectedDate
        }
      
  
      if(this.epiRes.length==0){
          // this.epiData[4].nextVisit ="After 6 months of 5th visit"
          // this.epiData[4].vaccineDate =""
          }else{
            this.epiData[4].status=this.epiRes[4].status
            this.epiData[4].id=this.epiRes[4].id   
            if(this.epiData[4].status==1)       
            this.epiData[5].action=1      
            this.epiData[4].nextVisit =this.epiRes[4].expectedDate
          }
      if(this.epiRes.length==0 && this.epiData[5].expectedDate=="0000"){
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
            this.epiData[5].nextVisit =this.epiRes[5].expectedDate
          }  
          console.log("epidata",this.epiData)    
                this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
  }
  addwomenepischedule(){
    
    this.userLoader=true;
    this.paramData= {"tokenID":this.patInfo.ptID,"hospitalID":this.patInfo.hospitalID,"patientID":this.patInfo.patientID,"departmentID":this.patInfo.departmentID}
    
    this.eService.addwomenepischedule(this.paramData).subscribe((response: any) => {
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

  updatewomenepischedule(id:any){

    this.userLoader=true;
    this.paramData= {"id":id,"hospitalID":this.detail.hospitalID}

    this.eService.updatewomenepischedule(this.paramData).subscribe((response: any) => {
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
  this.addwomenepischedule()
}else{
  
 this.updatewomenepischedule(id)
}
  }
}