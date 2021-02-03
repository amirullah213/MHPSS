import { Component, OnInit, TemplateRef } from '@angular/core';

import { Router } from "@angular/router";
import {formatDate} from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PharmacyServicesService } from '../services/pharmacy-services.service';
@Component({
  selector: 'ncri-smr-pat-detail',
  templateUrl: './smr-pat-detail.component.html',
  styleUrls: ['./smr-pat-detail.component.scss']
})
export class SmrPatDetailComponent implements OnInit {

  filterTerm: string;
  hospitalID:any;
  todayData:any;
  loaderDoc:boolean=false;
  model:any={};
  docResponseArray:any=[];
  docResponseArray1:any=[];
  errormsg:any;
  objDoc3: any={};
  modalRef3: any;
  loaderttv: boolean;
  model3: any={};
  patDataLocal: any={};
  loaderChild: boolean;
  model4: any={};
  childResponseArray: any=[];
  ttvResponseArray: any=[];
  model2: any={};
  newDOB: any;
  newResponsearr: any;
  loaderNew: boolean;
  age: number;
  genResponseArray: any;
  loaderGen: boolean;
  model21: any={};
  loaderUc: boolean;
  showdob: boolean;
  model1: any={};
  formData: any={};
  smrpatdata:any=[];
  pharmacyType:any=[];

  constructor( private pharmaService: PharmacyServicesService,private router: Router,    private modalService: BsModalService,){
      
  }
 
  

  ngOnInit(): void {
    
    this.smrpatdata=JSON.parse(localStorage.getItem('smrPats')) ;
    this.todayData=formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.pharmacyType=JSON.parse(localStorage.getItem('details'));
   console.log('date now==',this.todayData) ;
   this.getDispenseDetail();
  }

  openModAdd3(captureuser3: TemplateRef<any>) {
    
    this.objDoc3.reff=this.formData.refferedFrom
    this.objDoc3.doctor=this.formData.departmentID
    this.modalRef3 = this.modalService.show(captureuser3, Object.assign({}, { class: 'gray modal-lg' }));
  }
  
 
  
  onselectDoctor(docdata){
    console.log("doctor data===",docdata);
    //this.getUCs(tehId.id);
    }
 //--------------------get doctor list 
 getDispenseDetail() { 
  
   this.model1.itemID=this.smrpatdata.itemID;
   this.model1.pharmacyID=this.pharmacyType.id;
   this.model1.date=this.smrpatdata.itemID;
 
  this.loaderUc= true;
  
  this.pharmaService.getDispenseDetail(this.model1).subscribe(
    (response: any) => {
      if (response.status === 0) {
        
         this.docResponseArray1=response.data;
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

 
  gotoPrintPrescription(patdata){
    localStorage.setItem('pharmacyData',JSON.stringify(patdata) );
     window.open('/print/home')
   }
  gotoPrintRadiology(patdata){
    localStorage.setItem('pathDetails',JSON.stringify(patdata) );
   // window.open('/pharma/printRad')
    this.router.navigate(['/reception/printRad'])
    }
     gotoPrintPathology(patdata){
      localStorage.setItem('pathDetails',JSON.stringify(patdata) );
   // window.open('/pharma/printRad')
    this.router.navigate(['/reception/printRad'])
       }
   //--------------------get doctor list 
  
  gotoPrintPage(toknData){
          console.log("pats==",toknData)
          localStorage.setItem('token2Details',JSON.stringify(toknData));
          this.router.navigate(['reception/print2'])
  }

}
