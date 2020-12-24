import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { WardServiceService } from '../service/ward-service.service';

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
  showRef:boolean=false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private wardService:WardServiceService
  ) { }

  ngOnInit(): void {
    this.indoor= localStorage.getItem('indoorID');
    
    this.detailsData=JSON.parse(localStorage.getItem('wardData')) ;

    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');

    //previos page data
   

   this.dischargFormData =JSON.parse(localStorage.getItem('disData')) ;

if(localStorage.getItem('outData')!="undefined"){
   this.outFormData =JSON.parse(localStorage.getItem('outData')) ;
}
   this.prescID=JSON.parse(localStorage.getItem('prescriptionID'));
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
      
      med_remark: ['', Validators.required]
      // acceptTerms: [false, Validators.requiredTrue]
  },
  
  );

  this.dischargeForm = this.fb.group(
    {
    dis_type: ['', Validators.required],
    dis_date: ['', Validators.required],
    
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
 this.model99.ptID= this.detailsData.ptID

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
  this.model8.indoorStatus=2;
  debugger
  if(localStorage.getItem('outData')!="undefined"){
  this.model8.isCriticalIll=this.outFormData.criti_ill;
  this.model8.operativeProcedure=this.outFormData.operate_procedure;
  this.model8.dialysis=this.outFormData.dylasis;
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
changeCheckboxVal(e) {

  if (e.target.value == '0') {
    this.showRef = false;
  } else {
    this.showRef = true
  }
}
 
}
