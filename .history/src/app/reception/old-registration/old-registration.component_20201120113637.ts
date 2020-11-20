import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ReceptServiceService } from '../services/recept-service.service';

@Component({
  selector: 'ncri-old-registration',
  templateUrl: './old-registration.component.html',
  styleUrls: ['./old-registration.component.scss']
})
export class OldRegistrationComponent implements OnInit {
  patDataLocal:any={};
  loaderDoc:boolean=false;
  hospitalID:any;
  doctorID:any;
  docResponseArray:any=[];
  errormsg:any;
  objDoc:any={};
  loaderGen:boolean=false;
  genResponseArray:any=[];
  loaderttv:boolean=false;
  model3:any={};
  ttvResponseArray:any=[];
  loaderChild:boolean=false;
  model4:any={};
  childResponseArray:any=[];
  model: any = {};
  model2: any = {};
  modalRef: BsModalRef;
  age:any; 
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private receptService: ReceptServiceService,
    private router: Router,

    ) { }

  ngOnInit(): void {
    this.patDataLocal=JSON.parse(localStorage.getItem('paDetails'));
    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');
    console.log('patDataLocal ==', this.patDataLocal.dob);
    // if (this.patDataLocal.dob) {
    //   //convert date again to type Date
    //   const bdate = new Date(this.patDataLocal.dob);
    //   const timeDiff = Math.abs(Date.now() - bdate.getTime() );
    //   this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    //   console.log('age ==', this.age);
    // }
    if (this.patDataLocal.dob!=undefined) {
      var  nowDay,dobDay
      var todayDate=new Date();
      console.log('todayDate',todayDate.getFullYear())
      var ageyear = todayDate.getFullYear() - this.patDataLocal.dob.getFullYear();
      var agemonth = todayDate.getMonth() - this.patDataLocal.dob.getMonth();
      var ageday = todayDate.getDate() - this.patDataLocal.dob.getDate();
    
      if (agemonth <= 0) {
        ageyear--;
        agemonth = (12 + agemonth);
      }
      if (nowDay < dobDay) {
        agemonth--;
        ageday = 30 + ageday;
      }  if (agemonth == 12) {
        ageyear = ageyear + 1;
        agemonth = 0;
      }
    
      alert("Age in Year:" + ageyear + ',' + 'Month:' + agemonth + ',' + 'Day:' + ageday);
    
    }
  }
  openModAdd(captureuser: TemplateRef<any>) {
   this.getAllDoctros();
    this.modalRef = this.modalService.show(captureuser, Object.assign({}, { class: 'gray modal-lg' }));
  }
  openchildMod(childModal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(childModal);
  }
  //--------------------get doctor list 
  getAllDoctros() {
   
    this.loaderDoc= true;
    this.model.hospitalID=this.hospitalID;
    
    console.log('model ==', this.model);
    this.receptService.getDoctorsList(this.model).subscribe(
      (response: any) => {
        if (response.status === 0) {
         
           this.docResponseArray=response.data;
           console.log('hospitl list==',this.docResponseArray);
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
 //--------------------get doctor list 
 generateToken(modData) {
   console.log("modal data====",modData);
   this.loaderGen= true;
   this.model2.hospitalID=this.hospitalID;
   this.model2.patientID=this.patDataLocal.patientID;
   this.model2.departmentID=modData.doctor.id;
   this.model2.isIndoor=0;
   this.model2.refferedFrom=modData.reff;
  
   console.log('model2 ==', this.model2);
   this.receptService.generToken(this.model2).subscribe(
    (response: any) => {
      if (response.status === 0) {
       
         this.genResponseArray=response;
         console.log('hospitl list==',this.genResponseArray);
         this.loaderGen = false;
         alert('token generated successfuly');
         this.modalRef.hide();
         localStorage.setItem('tokenDetails',JSON.stringify(this.genResponseArray));
         this.router.navigate(['reception/print-token'])
        
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
//-------------------------
 //--------------------get doctor list 
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
        alert('TT vacination token generated successfuly');
        this.modalRef.hide();
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
  //--------------------get doctor list 
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
        alert('TT vacination token generated successfuly');
        this.modalRef.hide();
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
  //get doctor list ended
  onselectDoctor(docdata){
    console.log("doctor data===",docdata);
    //this.getUCs(tehId.id);
    }

}
