import { Component, OnInit, TemplateRef } from '@angular/core';
import {formatDate} from '@angular/common';
import { Router } from "@angular/router";

import { ReceptServiceService } from '../services/recept-service.service';
import { BsModalService } from 'ngx-bootstrap/modal';

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

  constructor( private receptService: ReceptServiceService,private router: Router,    private modalService: BsModalService,){
      
  }
 
  

  ngOnInit(): void {
    
    this.hospitalID= localStorage.getItem('hospitalID');
    this.todayData=formatDate(new Date(), 'yyyy-MM-dd', 'en')
   console.log('date now==',this.todayData) ;
   this.getPatCount();
  }

  openModAdd3(captureuser3: TemplateRef<any>) {
    
    this.objDoc3.reff=this.formData.refferedFrom
    this.objDoc3.doctor=this.formData.departmentID
    this.modalRef3 = this.modalService.show(captureuser3, Object.assign({}, { class: 'gray modal-lg' }));
  }
   //--------------------child vaccnication
   childVacination(modData) {
    console.log("modal data====",modData);
    this.loaderChild= true;
    this.model4.hospitalID=this.hospitalID;
    this.model4.patientID=this.patDataLocal.patientID;
    this.model4.departmentID=45;
    this.model4.isIndoor=6;
    this.model4.refferedFrom=modData.reff;
   
    console.log('model4 ==', this.model4);
    this.receptService.generToken(this.model4).subscribe(
     (response: any) => {
       if (response.status === 0) {
        
          this.childResponseArray=response;
          console.log('hospitl childResponseArray==',this.childResponseArray);
          this.loaderChild = false;
         // alert('TT vacination token generated successfuly');
          this.modalRef3.hide();
          localStorage.setItem('tokenDetails',JSON.stringify(this.childResponseArray));
          this.router.navigate(['reception/print-token'])
    
    
         
       }
   if (response.status === 1) {
         this.errormsg = response.error;
         this.loaderChild = false;
         alert('Problem in service! please Try again')
         console.log('error=', this.errormsg);
         
       }
     },
     (error) => {}
   );
  
  }
  //-------------------------
  ttvacination(modData) {
    console.log("modal data====",modData);
    this.loaderttv= true;
    this.model3.hospitalID=this.hospitalID;
    this.model3.patientID=this.patDataLocal.patientID;
    this.model3.departmentID=45;
    this.model3.isIndoor=5;
    this.model3.refferedFrom=modData.reff;
   
    console.log('model3 ==', this.model3);
    this.receptService.generToken(this.model3).subscribe(
     (response: any) => {
       if (response.status === 0) {
        
          this.ttvResponseArray=response;
          console.log('hospitl ttvResponseArray==',this.ttvResponseArray);
          this.loaderttv = false;
         // alert('TT vacination token generated successfuly');
          this.modalRef3.hide();
          localStorage.setItem('tokenDetails',JSON.stringify(this.ttvResponseArray));
          this.router.navigate(['reception/print-token'])
         
       }
   if (response.status === 1) {
         this.errormsg = response.error;
         this.loaderttv = false;
         alert('Problem in service! please Try again')
         console.log('error=', this.errormsg);
         
       }
     },
     (error) => {}
   );
  
  }
  //-------------------------
  registerNewPat(formval,captureuser3) {
    debugger
    this.formData = formval;
    this.patDataLocal=formval
    this.getAllDoctros()


    this.openModAdd3(captureuser3)
    
   
  }
  onselectDoctor(docdata){
    console.log("doctor data===",docdata);
    //this.getUCs(tehId.id);
    }
 //--------------------get doctor list 
 getAllDoctros() { 
   debugger
  this.loaderUc= true;
  this.model1.hospitalID=this.hospitalID;
  
  this.receptService.getDoctorsList(this.model1).subscribe(
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
//-------------------------
updateclinic(modData) {
  
  if(modData.doctor==0)
  {alert("Please select a clinic first")
  }
  else{
  this.loaderGen= true;
  this.model21.hospitalID=this.hospitalID;
  this.model21.patientID=this.patDataLocal.patientID;
  this.model21.departmentID=modData.doctor;
  this.model21.isIndoor=0;
  this.model21.refferedFrom=modData.reff;
  this.model21.ptID=this.formData.ptID;
  
    
  this.receptService.updateclinic(this.model21).subscribe(
  
    (response: any) => {
     if (response.status === 0) {
      
        this.genResponseArray=response;
        this.loaderGen = false;
        this.modalRef3.hide();
        localStorage.removeItem("token2Details")
        debugger
        this.patDataLocal.departmentName=this.genResponseArray.departmentName
        localStorage.setItem('token2Details',JSON.stringify(this.patDataLocal));
        this.router.navigate(['reception/print2'])
       
     }
 if (response.status === 1) {
       this.errormsg = response.error;
       this.loaderGen = false;
       alert('Problem in service! please Try again')
       console.log('error=', this.errormsg);
       
     }
   },
   (error) => {}
 );
  }
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
          localStorage.setItem('token2Details',JSON.stringify(toknData));
          this.router.navigate(['reception/print2'])
  }

}


