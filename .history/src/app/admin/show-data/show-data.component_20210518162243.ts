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
  selector: 'ncri-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.scss']
})
export class ShowDataComponent implements OnInit {

  loader_s3:boolean=false;
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
  allList:any={};
  imageUrl:string;
  imageArr:any=[];
  sheetUrl:any='';
  imageUrlSheet:any='';
  showDataDetails:any={};
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
    
    this.detailsData=JSON.parse(localStorage.getItem('details')) ;
    console.log(' this.detailsData====', this.detailsData)
    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');

  this.otherMedicsHome.push(localStorage.getItem('otherMedicsHome'));
  console.log(' this.othermedicHome====',this.otherMedicsHome);
  this.hometreatment=JSON.parse(localStorage.getItem('homeTreatment'));
  console.log(' this.hometreatment====',this.hometreatment);
  this.othermed=localStorage.getItem('otherMedics');
  console.log(' this.othermed====',this.othermed);
  //to populate the from
  this.showDataDetails =JSON.parse(localStorage.getItem('showData'))  ;
  console.log('showData=====',this.showDataDetails);

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
  this.loaderMedic = true;
  let AllFormsObj = Object.assign(
    {},
    this.treatmentForm.value,
    
  );
 
  AllFormsObj.user_id=this.detailsData.id;
  AllFormsObj.photos=this.imageArr;
  AllFormsObj.photo_of_attd_sheet=this.imageUrlSheet;
  
 console.log('modal 99==', AllFormsObj);
  this.adminService.add_mhpss_session(AllFormsObj).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.treatmentForm.reset();
        this.imageArr=[];
        this.imageUrlSheet='';
      // this.medicinesFinal=[];
       // this.getDischargeData();
        alert('Data added successfuly');

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
debugger
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
   public imagePath;
   url: any={};
   onSelectFile(event) { // called each time file input changes
     if (event.target.files && event.target.files[0]) {
       var reader = new FileReader();
       this.imagePath = event.target.files;
       reader.readAsDataURL(event.target.files[0]); // read file as data url
       reader.onload = (event) => { // called once readAsDataURL is completed
         this.url = reader.result;  //add source to image
         console.log('imagebaseProfile', this.url);
          this.saveToS3(this.url)
                                  }
     }
      }

      saveToS3(base64){
        if(this.imageArr.length==3){
          alert("You can not add more than 3 images");
        }else{

       
        var baseImg=base64.split(',');  
   
        var baseImgFinal=baseImg[1];
        this.loaderUpdate = true;
       


        this.loader_s3=true;
      
      // this.params.auth_token =  localStorage.getItem('auth_token');
       this.params.image =  baseImgFinal;
       this.adminService.upload_to_s3(this.params).subscribe(
        (response: any) => {
          if (response.status === 0) {
       
      //  this.adminService.upload_to_s3(this.params).subscribe(response => {
      //     if (response.status === 0) {
        
           this.allList=response;
           console.log('allList==',this.allList);
            this.imageUrl=this.allList.fileName;
            console.log('allListurl==',this.imageUrl);
            this.imageArr.push(this.imageUrl);
            console.log('imageArr==',this.imageArr);
             this.loader_s3=false;
          }
       if (response.status === 1) {
           this.errormsg = response.errors;
            this.loader_s3=false;
            console.log('error=',this.errormsg);
               }
       }, error => {
      
       });
      }
      }
    // sheetUrl
    public imagePathSheet;
    urlSheet: any={};
    onSelectFileSheet(event) { // called each time file input changes
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        this.imagePathSheet = event.target.files;
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.urlSheet = reader.result;  //add source to image
          console.log('imagebaseProfile', this.urlSheet);
           this.saveToS3Sheet(this.urlSheet)
                                   }
      }
       }
       saveToS3Sheet(base64){
        debugger
        var baseImgSheet=base64.split(',');  
   
        var baseImgSheetFinal=baseImgSheet[1];
        this.loaderUpdate = true;
       


        this.loader_s3=true;
      
      // this.params.auth_token =  localStorage.getItem('auth_token');
       this.params.image =  baseImgSheetFinal;
       this.adminService.upload_to_s3(this.params).subscribe(
        (response: any) => {
          if (response.status === 0) {
       
      //  this.adminService.upload_to_s3(this.params).subscribe(response => {
      //     if (response.status === 0) {
        debugger
           this.allList=response;
           console.log('allList==',this.allList);
            this.imageUrlSheet=this.allList.fileName;
            console.log('allListurl==',this.imageUrl);
           // this.imageArrSheet=
            console.log('imageArr==',this.imageUrlSheet);
             this.loader_s3=false;
          }
       if (response.status === 1) {
           this.errormsg = response.errors;
            this.loader_s3=false;
            console.log('error=',this.errormsg);
               }
       }, error => {
      
       });
      }
}
