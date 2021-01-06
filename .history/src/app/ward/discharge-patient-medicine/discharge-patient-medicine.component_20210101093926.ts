import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { WardServiceService } from '../service/ward-service.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'ncri-discharge-patient-medicine',
  templateUrl: './discharge-patient-medicine.component.html',
  styleUrls: ['./discharge-patient-medicine.component.scss']
})
export class DischargePatientMedicineComponent implements OnInit {
  userData: any = {};
  paramData: any = {};
  loader: boolean = false;
  responseText: any = '';
  tab: string = 'newPats';
  downloadType: string = 'csv';
  modalRef: BsModalRef;
  userLoader: boolean = false;
  activateLoader: boolean = false;
  deactivateLoader: boolean = false;
  userList: any = [];
  outdoorData:any =[];
  errormsg:string;
  hospitalID:any;
  doctorID:any;
  indoor:any;
  detailsData:any={};
  medStr:string;
  model:any={};
  gettreatmetData:any =[];
  gettreatmetData2:any =[];
  medicID:any;
  medicShow:boolean=false;
  medicArr:any =[];
  medicinesNewdata:any={};
  medicinesFinal:any=[]
  loaderMedic:boolean=false;
  model99:any={};
  dischargFormData:any={};
  prescID:any;
  model8:any={};
  loaderUpdate:boolean=false;
  diagnosArr:any=[];
  outFormData:any={};
  showDischargeButton:boolean=false;

  dischargeForm:FormGroup;

  treatmentForm:FormGroup;
  disFormData: any;
  showRef:any=2;
  params:any={};
  refList:any=[];
  docType:any;
  arrylist:any=[];
  id:any;
  model9:any={};
  model119:any={};
  currentDate:any;
  cValue:any;
  otherMedics:any=[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private wardService:WardServiceService
  ) { }

  ngOnInit(): void {

    this.currentDate = new Date();

    this.cValue = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
    console.log('date-======',this.cValue)
    console.log('showRef',this.showRef)
    this.indoor= localStorage.getItem('indoorID');
    
    this.detailsData=JSON.parse(localStorage.getItem('wardData')) ;
    console.log(' this.detailsData====', this.detailsData)
    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');

    //previos page data
    this.getindoorlist();

   this.dischargFormData =JSON.parse(localStorage.getItem('disData')) ;

if(localStorage.getItem('outData')!="undefined"){
   this.outFormData =JSON.parse(localStorage.getItem('outData')) ;
}
   this.prescID=JSON.parse(localStorage.getItem('prescriptionID'));
   console.log('presid=======',this.prescID)
   this.diagnosArr=JSON.parse( localStorage.getItem('diagnosArr'));
    this.getMedicinesData();

    //-----------------
    this.treatmentForm = this.fb.group(
      {
      med_name: ['', Validators.required],
      med_unit: ['', Validators.required],
      med_type: ['', Validators.required],
      // med_instock: ['', Validators.required]
      med_quantity: ['', Validators.required],
      med_dose: ['', Validators.required],
      med_parandials: ['', Validators.required],
      
      med_remark: ['', Validators.required],
      tComments: ['', Validators.required]
      // acceptTerms: [false, Validators.requiredTrue]
  },
  
  );

  this.dischargeForm = this.fb.group(
    {
    dis_type: ['', Validators.required],
    dis_date: ['', Validators.required],
    dis_date2: ['', Validators.required],
    access_type: ['', Validators.required],
    ref:['', Validators.required],
    
},

);
    //------------
  }
  
  //----------------------------------
  
  /////////////////////----------

//get all diagnostic list
getMedicinesData() {
  this.loader= true;
  this.model.hospitalID=this.hospitalID;
  this.model.prescriptionID=-1
  console.log('modal ==', this.model);
  this.wardService.getTreatData(this.model).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log('treatment responxswe====',response);
         response.medicines.forEach(v => {
          this.medStr = v.itemName + ", "+ v.unit+ " "+ v.type;                                      
           this.gettreatmetData.push({"itemName":this.medStr,v});
         //console.log('gettreatmetData==',this.gettreatmetData)
         });
        
      console.log('this.gettreatmetData==',this.gettreatmetData);
        this.loader = false;
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loader = false;
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}
//---------------------------------------
addPresMedicines() {
  this.showDischargeButton=true;
  this.loaderMedic= true;
  this.model99.prescriptionID=this.prescID;
  this.model99.medicines=this.medicinesFinal;
  this.model99.type=3;
  this.model99.hospitalID=this.hospitalID;
 this.model99.ptID= this.detailsData.ptID;
//  this.model99.otherMedicArray= this.otherMedics;

 console.log('modal 99==', this.model99);
  this.wardService.addPresMedics(this.model99).subscribe(
    (response: any) => {
      if (response.status === 0) {
       // this.outdoorForm.reset();
      // this.medicinesFinal=[];
       // this.getDischargeData();
        alert('Medicines added successfuly.Press Discharge button to discharge patient');

        this.loaderMedic = false;
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderMedic = false;

        console.log('error=', this.errormsg);
        alert('Problem in service! try again');
      }
    },
    (error) => {}
  );
}

//----------------------------------------

//==============update indoor detail to discharge patient
updateIndoor(fv) {
 
  if(fv.dis_date && fv.dis_type){
  this.loaderUpdate= true;
  this.model8.hospitalID=this.hospitalID;
  this.model8.tokenID=this.detailsData.ptID;
  this.model8.indoorStatus=3;
  debugger
  if(localStorage.getItem('outData')!="undefined"){
  this.model8.isCriticalIll=this.outFormData.isCriticalIll;
  this.model8.operativeProcedure=this.outFormData.operativeProcedure;
  this.model8.dialysis=this.outFormData.dialysis;
  }
  else{
    this.model8.isCriticalIll="0"
    this.model8.operativeProcedure=""
    this.model8.dialysis=""
  }
  this.model8.dischargeType=fv.dis_type;
  this.model8.dischargeDate=fv.dis_date;
  this.model8.diagnosis=this.diagnosArr;
  console.log('modal 8==', this.model8);
  
  this.wardService.updateIndoorDetail(this.model8).subscribe(
    (response: any) => {
      if (response.status === 0) {
       // this.outdoorForm.reset();
        //this.getoutDoorData();

        this.router.navigate(['/ward/home'])
        this.loaderUpdate = false;
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderUpdate = false;
        console.log('error=', this.errormsg);
        alert('Problem in service! try again');
        
      }
    },
    (error) => {}
  );

}else{
  alert("Please select discharge type and date")
}
}
//+===================ended
//---------------------
onSelectMedics(medic){
  console.log("medic data===",medic.item);
this.medicID=medic.item.v.itemID;
  this.treatmentForm.patchValue({
    med_unit: medic.item.v.unit,
    med_type: medic.item.v.type, 
    
  });

}
//--------------

//==========================
addmoreMedics(){
  this.medicShow=true;
  console.log('treatmentForm values==',this.treatmentForm.value);
  //this.medicArr.push(this.treatmentForm.value);
  console.log('medicArr==',this.medicArr);
  this.medicinesNewdata['medicine']=this.treatmentForm.value.med_name;
 // this.medicinesNewdata['med_unit']=this.medicArr.med_unit;
 // this.medicinesNewdata['med_unit']=this.medicArr.med_type;
  this.medicinesNewdata['prescribedQuantity']=this.treatmentForm.value.med_quantity;
  this.medicinesNewdata['dose']=this.treatmentForm.value.med_dose;
  this.medicinesNewdata['prandial']=this.treatmentForm.value.med_parandials;
  this.medicinesNewdata['remarks']=this.treatmentForm.value.med_remark;

  this.medicinesNewdata['medicineID']=this.medicID;
  this.medicinesNewdata['issuedQuantity']='';
  this.medicinesNewdata['duration']='';
  
  console.log('medicinesNewdata==',this.medicinesNewdata);
  this.medicinesFinal.push(this.medicinesNewdata);
  console.log('medicinesFinal==',this.medicinesFinal);
  this.medicinesNewdata={};
  this.treatmentForm.reset();
}
//========================
//=============================
removeArr(indx){
  this.medicinesFinal.splice(indx, 1);
  console.log('$x==',this.medicinesFinal)
}
//===============================

//==========================
addmoreOtherMedics(){
this.otherMedics.push(this.treatmentForm.value.tComments);
this.treatmentForm.reset();
console.log('other medics array-------',this.otherMedics)
}
//=============================
removeArr2(indx){
  this.otherMedics.splice(indx, 1);
  console.log('$x2==',this.otherMedics)
}
//===============================
//==========================
changeCheckboxVal(e) {

  if (e.target.value == '0') {
    this.showRef = 0;
  } else {
    this.showRef = 1
  }
  console.log('radio value==',this.showRef)
}
//============================
getindoorlist()
   {
     this.params={"hospitalID": localStorage.getItem('hospitalID')}
     this.wardService.getindoorlist(this.params).subscribe
     ((response: any) => {
       if (response.status === 0) {
                 
         
       this.refList = response.data;

         this.userLoader = false;
       } else {
         this.userLoader = false;
         alert('Something went wrong try again');
       }
     },
       (error) => { }
     );
    
    }

    changeRefVal(e){
     
     console.log('eeeeeeeeee',e)
      if(e!="Choose Referral"){
        debugger
     this.arrylist=[]
     this.arrylist = this.refList
    
       
       if(e){
       this.docType=1;
       this.id = e
       }
       else
       {
         this.docType=undefined;
         this.id = undefined
       }
     }
   }
//operate indoor details
operateIndoor(dpt) {
  console.log('deptdat-=======',dpt)
  
  this.loaderUpdate= true;
  this.model119.patientID=this.detailsData.patientID;
  this.model119.hospitalID=this.hospitalID;
  this.model119.ptID=this.detailsData.ptID;
   this.model119.departmentID= dpt.ref;
  this.model119.isIndoor=1;
  this.model119.refferedFrom=this.detailsData.departmentName;
  this.model119.diagnosis=this.diagnosArr;
  this.model119.prescriptionID =this.prescID;
  console.log('model119==', this.model119);
  
  this.wardService.operateToken(this.model119).subscribe(
    (response: any) => {
      if (response.status === 0) {
       // this.outdoorForm.reset();
        // this.getoutDoorData();
        
         alert('Done Successfully');
        this.router.navigate(['/ward/home']);
        this.loaderUpdate = false;
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderUpdate = false;
        console.log('error=', this.errormsg);
        alert('Problem in service! try again');
        
      }
    },
    (error) => {}
  );

}
//operate indoor details
   //==============update indoor detail to discharge patient
updateIndoor2(fv) {
 console.log('fvfvfvfvfv=====',fv)
  if(fv.ref){
  this.loaderUpdate= true;
  this.model9.hospitalID=this.hospitalID;
  this.model9.tokenID=this.detailsData.ptID;
  this.model9.indoorStatus=2;
  debugger
  if(localStorage.getItem('outData')!="undefined"){
  this.model9.isCriticalIll=this.outFormData.isCriticalIll;
  this.model9.operativeProcedure=this.outFormData.operativeProcedure;
  this.model9.dialysis=this.outFormData.dialysis;
  }
  else{
    this.model9.isCriticalIll="0"
    this.model9.operativeProcedure=""
    this.model9.dialysis=""
  }
  this.model9.dischargeType=3;
  this.model9.dischargeDate=this.cValue;
  this.model9.diagnosis=this.diagnosArr;
  console.log('modal 9==', this.model9);
  
  this.wardService.updateIndoorDetail(this.model9).subscribe(
    (response: any) => {
      if (response.status === 0) {
       // this.outdoorForm.reset();
        //this.getoutDoorData();
       this.operateIndoor(fv);
       // this.router.navigate(['/ward/home'])
        this.loaderUpdate = false;
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderUpdate = false;
        console.log('error=', this.errormsg);
        alert('Problem in service! try again');
        
      }
    },
    (error) => {}
  );

 }else{
   alert("Please select Refferal")
 }
}
//+===================ended
 
}
