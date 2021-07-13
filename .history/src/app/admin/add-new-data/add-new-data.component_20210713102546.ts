import { Component, OnDestroy, OnInit, TemplateRef,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AdminServiceService } from '../services/admin-service.service';
import {formatDate} from '@angular/common';
import {AgmMap,MapsAPILoader  } from '@agm/core'; 
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ncri-add-new-data',
  templateUrl: './add-new-data.component.html',
  styleUrls: ['./add-new-data.component.scss']
})
export class AddNewDataComponent implements OnInit {
  @ViewChild(AgmMap,{static: true}) public agmMap: AgmMap; 
  lat:any;
  lng:any;
  getAddress:any;
  loader_s3:boolean=false;
  loader_s3_S:boolean=false;

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
  allowGeoRecall:boolean = true;
  showAlert:boolean=false;
  alerts:any={};
  villageEntryFileds:boolean=false;
  capDropDownList:any=[];
  lhwDropDownList:any=[];
  lhsDropDownList:any=[];
  lhwEntryFileds:boolean=false;
  lhsEntryFileds:boolean=false;
  capEntryFileds:boolean=false;
 // mytime:Date=new Date();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminServiceService,
    private datePipe: DatePipe
   
   // private apiloader: MapsAPILoader
  ) { }

  ngOnInit(): void {
   
    // window.onload = function() {
    //   var startPos;
    //   var geoSuccess = function(position) {
    //     startPos = position;
    //     console.log('lat------------------', startPos.coords.latitude);
    //     console.log('long------------------', startPos.coords.longitude);
       
    //   };
    //   navigator.geolocation.getCurrentPosition(geoSuccess);
    // };
    this.get() ;
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
        user_id: [''],
        //assign user id by local storage
        // villageData: [],
        village_id: ['',Validators.required],
        latitude: [''],
        longitude: [''],
        date: ['',Validators.required],
        time: [new Date(),Validators.required],
        team_member: ['', Validators.required],
        lhw: [''],
        lhs: [''],
        cap: [''],
       
        male_participants: ['', Validators.required],
       
        female_participants: ['', Validators.required],
       
        iecc_received: [''],
        
        ppes_received: [''],
       
        active_positive_cases: [''],
       
        linkage_with_dist: [''],
       
        linkages_for_community: [''],
        
        sharing_with_tele: [0],
       
        mobilized_for_vaccination: [0],
       
        visiting_nearby_govt_health_facility: [0],
        
        female_mobilized: [0],
       
        mobilized_for_routine_vaccination: [0],
       
        social_media_mode: [''],
        
        listeners_of_fm: [''],
       
        contact_details: [''],
       
        cases_reported_to_child_protection: [''],
       
        comments: [''],
      
        photo_of_attd_sheet: [''],
       
        remarks: [''],
       
        photos: [''],
        sharing_with_tele_2nd:[''],
        mobilized_for_vaccination_2nd:[''],
        visiting_nearby_govt_health_facility_2nd:[''],
        female_mobilized_2nd:[''],
        mobilized_for_routine_vaccination_2nd:[''],

        district:['', Validators.required],
        taluka:['', Validators.required],
        union_council:['', Validators.required],
        village:['', Validators.required],

        person1_name: [''],
        person1_detail: [''],
        person2_name: [''],
        person2_detail: [''],

        boys:[''],
        girls:[''],

        lhwOther:[''],
        lhsOther:[''],
        capother:[''],
     
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
 
  get() {  
  debugger
    if (navigator.geolocation) {  
        navigator.geolocation.getCurrentPosition((position: Position) => {  
            if (position) {  
                this.lat = position.coords.latitude;  
                this.lng = position.coords.longitude;  
                this.getAddress = (this.lat, this.lng)  
                console.log('posiiiiiiiiiiiiiiiiin',position)
                console.log('laaaat',this.lat);
                

                // this.apiloader.load().then(() => {  
                //     let geocoder = new google.maps.Geocoder;  
                //     let latlng = {  
                //         lat: this.lat,  
                //         lng: this.lng  
                //     };  
                //     geocoder.geocode({  
                //         'location': latlng  
                //     }, function(results) {  
                //         if (results[0]) {  
                //             this.currentLocation = results[0].formatted_address;  
                //             console.log(this.assgin);  
                //         } else {  
                //             console.log('Not found');  
                //         }  
                //     });  
                // });  
            } else {
              // hideLoadingDiv()
              alert('Geolocation is not supported by this device')
          }
        })  
    } 
      // alert('Geolocation is not supported by this device. Allow current location from your browser settings ')
    
}   
 
  //----------------------------------
  
  /////////////////////----------

//get all diagnostic list
mhpss_villages() {
  this.loader= true;
  this.model.hospitalID=this.hospitalID;
  this.model.prescriptionID=-1
  console.log('modal ==', this.model);
  let mod={};
  this.adminService.mhpss_villages(mod).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log('treatment responxswe====',response.data);
        //  response.medicines.forEach(v => {
        //   this.medStr = v.itemName + ", "+ v.unit+ " "+ v.type;                                      
        //    this.gettreatmetData.push({"itemName":this.medStr,v});
        //  //console.log('gettreatmetData==',this.gettreatmetData)
        //  });
        this.gettreatmetData=response.data;
        this.capDropDownList=response.cap;
        this.lhwDropDownList=response.lhw;
        this.lhsDropDownList=response.lhs;
      let otherObjForVillages= {
        'created_at': "",
        'district': "",
        'id': -1,
        'taluka': "",
        'union_council': "",
        'updated_at': "",
        'village': "Others",
      }
      this.gettreatmetData.push(otherObjForVillages);
      let otherObjForCAP= {
        'created_at': "",
        'id': -1,
        'name': "Others",
      }
     this.capDropDownList.push(otherObjForCAP)
     let otherObjForLHW= {
      'cnic': "",
      'created_at': "",
      'id': -1,
      'name': "Others",
    }
    this.lhwDropDownList.push(otherObjForLHW);
    let otherObjForLHS= {
      'created_at': "",
      'id': -1,
      'name': "Others",
    }
    this.lhsDropDownList.push(otherObjForLHS)

        console.log('this.gettreatmetData==',this.gettreatmetData);
        this.loader = false;
      }
      
  
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loader = false;
        let type='danger';
        let msg="Problem in service! try again";
        this.alertDanger(type,msg);
        
      }
    },
    (error) => {}
  );

}
//---------------------------------------
add_mhpss_session() {
  debugger
  this.loaderMedic = true;
  let AllFormsObj = Object.assign(
    {},
    this.treatmentForm.value,
    
  );
 
  AllFormsObj.user_id=this.detailsData.id;
  AllFormsObj.photos=this.imageArr;
  AllFormsObj.photo_of_attd_sheet=this.imageUrlSheet;
  AllFormsObj.latitude=this.lat;
  AllFormsObj.longitude=this.lng;
  if (AllFormsObj.date !== '') {
    AllFormsObj.date = this.datePipe.transform(
      AllFormsObj.date,
      'yyyy-MM-dd'
    );
    // this.global.dateFormat(AllFormsObj.date_incurred)
  } else {
    AllFormsObj.date = null;
  }

  if (AllFormsObj.time !== '') {
    AllFormsObj.time = this.datePipe.transform(
      AllFormsObj.time,
      'HH:mm:ss'
    );
    // this.global.dateFormat(AllFormsObj.date_incurred)
  } else {
    AllFormsObj.time = null;
  }
  //latitude,longitude
  if(AllFormsObj.latitude=='' || AllFormsObj.latitude==undefined || AllFormsObj.latitude=='undefined' || AllFormsObj.longitude=='' || AllFormsObj.longitude==undefined ||AllFormsObj.longitude=='undefined'){
    //alert('Can,t proceed without allowing geolocation');
    let type='danger';
    let msg="Can,t proceed without allowing geolocation";
    this.alertDanger(type,msg);
    this.loaderMedic = false;
  }else{
 if(AllFormsObj.photos.length==0){
  let type='danger';
  let msg="Please upload at least one photo for 'Take photos' field!";
  this.alertDanger(type,msg);
  // alert("Please upload at least one photo for 'Take photos' field!");
   this.loaderMedic = false;
 }else{

 
 console.log('modal 99==', AllFormsObj);
  this.adminService.add_mhpss_session(AllFormsObj).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.treatmentForm.reset();
        this.imageArr=[];
        this.imageUrlSheet='';
      // this.medicinesFinal=[];
       // this.getDischargeData();
       debugger
       let type='success';
       let msg='Data added successfuly';
       this.alertSuccess(type,msg);
       // alert('Data added successfuly');

        this.loaderMedic = false;
        setTimeout(()=>{
          this.router.navigate(['/admin/home']);                       //<<<---using ()=> syntax
        }, 2000);
        
        
       
    
        
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderMedic = false;

        console.log('error=', this.errormsg);
       let type='danger';
       let msg="Problem in service! try again";
       this.alertDanger(type,msg);
       // alert('Problem in service! try again');
      }
    },
    (error) => {}
  );
}
}
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
  this.treatmentForm.value
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
       


        this.loader_s3_S=true;
      
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
             this.loader_s3_S=false;
          }
       if (response.status === 1) {
           this.errormsg = response.errors;
            this.loader_s3_S=false;
            console.log('error=',this.errormsg);
               }
       }, error => {
      
       });
      }
      // alert message functions
alertSuccess(typ,msg){
  this.showAlert=true;
  this.alerts = {
    type: typ,
    msg:msg,
   // timeout: 3000
  };
  this.delay();
}
alertDanger(typ,msg){
  this.showAlert=true;
  this.alerts = {
    type: typ,
    msg:msg,
    //timeout: 3000
  };
  this.delay();
}

delay(){
  console.log('this.showAlertup',this.showAlert);
  setTimeout(()=>{                           //<<<---using ()=> syntax
    console.log('this.showAlertdown',this.showAlert)
  this.showAlert=false;
  
  console.log('this.showAlertdown',this.showAlert)
}, 5000);

}
villageSelect(targt){
  debugger
  targt.target.value;
  if(targt.target.value=='-1'){
    this.villageEntryFileds=true;
  }else{
    this.villageEntryFileds=false;
  }
  
}
selectLHW(trget){
debugger
if(trget.target.value=='Others'){
  this.lhwEntryFileds=true;
}else{
  this.lhwEntryFileds=false;

}

}
selectLHS(trget){
  debugger
  if(trget.target.value=='Others'){
    this.lhsEntryFileds=true;
  }else{
    this.lhsEntryFileds=false;
  
  }
  
  }
  selectCAP(trget){
    debugger
    if(trget.target.value=='Others'){
      this.capEntryFileds=true;
    }else{
      this.capEntryFileds=false;
    
    }
    
    }
//alert message functions
}