import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AdminServiceService } from '../services/admin-service.service';
import {formatDate} from '@angular/common';
@Component({
  selector: 'ncri-add-new-data',
  templateUrl: './add-new-data.component.html',
  styleUrls: ['./add-new-data.component.scss']
})
export class AddNewDataComponent implements OnInit {

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
  otherMedicsHome:any=[];
  otherMedicsHome2:any=[];
  hometreatment:any=[];
  othermed:any=[];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminServiceService
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

  this.otherMedicsHome.push(localStorage.getItem('otherMedicsHome'));
  console.log(' this.othermedicHome====',this.otherMedicsHome);
  this.hometreatment=JSON.parse(localStorage.getItem('homeTreatment'));
  console.log(' this.hometreatment====',this.hometreatment);
  this.othermed=localStorage.getItem('otherMedics');
  console.log(' this.othermed====',this.othermed)

    //previos page data
   

   this.dischargFormData =JSON.parse(localStorage.getItem('disData')) ;

if(localStorage.getItem('outData')!="undefined"){
   this.outFormData =JSON.parse(localStorage.getItem('outData')) ;
}
   this.prescID=JSON.parse(localStorage.getItem('prescriptionID'));
   console.log('presid=======',this.prescID)
   this.diagnosArr=JSON.parse( localStorage.getItem('diagnosArr'));
    this.mhpss_villages();

    //-----------------
    this.treatmentForm = this.fb.group(
      {
        user_id: ['', Validators.required],
        //assign user id by local storage
        // villageData: [],
        village_id: [''],
        latitude: [''],
        longitude: [''],
        date: [''],
        time: [''],
        team_member: ['', Validators.required],
        lhw: ['', Validators.required],
        lhs: ['', Validators.required],
        cap: ['', Validators.required],
       
        male_participants: ['', Validators.required],
       
        female_participants: ['', Validators.required],
       
        iecc_received: ['', Validators.required],
        
        ppes_received: ['', Validators.required],
       
        active_positive_cases: ['', Validators.required],
       
        linkage_with_dist: ['', Validators.required],
       
        linkages_for_community: ['', Validators.required],
        
        sharing_with_tele: ['', Validators.required],
       
        mobilized_for_vaccination: ['', Validators.required],
       
        visiting_nearby_govt_health_facility: ['', Validators.required],
        
        female_mobilized: ['', Validators.required],
       
        mobilized_for_routine_vaccination: ['', Validators.required],
       
        social_media_mode: ['', Validators.required],
        
        listeners_of_fm: ['', Validators.required],
       
        contact_details: ['', Validators.required],
       
        cases_reported_to_child_protection: ['', Validators.required],
       
        comments: ['', Validators.required],
      
        photo_of_attd_sheet: ['', Validators.required],
       
        remarks: ['', Validators.required],
       
        photos: ['', Validators.required],

     
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
mhpss_villages() {
  this.loader= true;
  this.model.hospitalID=this.hospitalID;
  this.model.prescriptionID=-1
  console.log('modal ==', this.model);
  this.adminService.mhpss_villages(this.model).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log('treatment responxswe====',response.data);
        //  response.medicines.forEach(v => {
        //   this.medStr = v.itemName + ", "+ v.unit+ " "+ v.type;                                      
        //    this.gettreatmetData.push({"itemName":this.medStr,v});
        //  //console.log('gettreatmetData==',this.gettreatmetData)
        //  });
        this.gettreatmetData=response.data
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
add_mhpss_session() {
  debugger
  let AllFormsObj = Object.assign(
    {},
    this.treatmentForm.value,
    
  );
 

 

 console.log('modal 99==', AllFormsObj);
  // this.adminService.add_mhpss_session(this.model99).subscribe(
  //   (response: any) => {
  //     if (response.status === 0) {
  //      // this.outdoorForm.reset();
  //     // this.medicinesFinal=[];
  //      // this.getDischargeData();
  //       alert('Medicines added successfuly.Press Discharge button to discharge patient');

  //       this.loaderMedic = false;
  //     }
  // if (response.status === 1) {
  //       this.errormsg = response.error;
  //       this.loaderMedic = false;

  //       console.log('error=', this.errormsg);
  //       alert('Problem in service! try again');
  //     }
  //   },
  //   (error) => {}
  // );
}

//----------------------------------------


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
this.otherMedicsHome2.push(this.treatmentForm.value.tComments);
this.treatmentForm.reset();
console.log('other medics array-------',this.otherMedicsHome2)
}
//=============================
removeArr2(indx){
  this.otherMedicsHome2.splice(indx, 1);
  console.log('$x2==',this.otherMedicsHome2)
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

   getVillageInfo(dta){
     debugger
     this.treatmentForm.value;

     console.log(dta)
   }
 
}