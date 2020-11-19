import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ReceptServiceService } from '../services/recept-service.service';

@Component({
  selector: 'ncri-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  isCollapsed = true;

  // currentDate = new Date();
  // form = new FormGroup({
  //   dateYMD: new FormControl(new Date()),
  //   dateFull: new FormControl(new Date()),
  //   dateMDY: new FormControl(new Date()),
  //   dateRange: new FormControl([
  //     new Date(),
  //     new Date(this.currentDate.setDate(this.currentDate.getDate() + 7))
  //   ])
  // });

  model: any = {};
  modalRef: BsModalRef;
  hospitalID:any;
  doctorID:any;
  regisForm: FormGroup;
  searchForm: FormGroup;
  submitted = false;
  userArray:any =[];
  loaderCNIC:boolean=false;
  errormsg:any;
  nicResponseArray:any=[];
  tokenResponseObj:any={};
  model1: any = {};
  loaderToken:boolean=false;
  model2:any={};
  loaderNew:boolean=false;
  loaderDists:boolean=false;
  model3:any={};
  distResponseArray:any=[];
  model4:any={};
  loaderTehsil:boolean=false;
  tehsilsResponseArray:any=[];
  loaderUc:boolean=false;
  model5:any={};
  ucResponseArray:any=[];
  ucID:any;

  constructor(
     private modalService: BsModalService,
     private fb: FormBuilder,
     private receptService: ReceptServiceService,
      ) 
  {
    
  }

  ngOnInit(): void {
    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');

    this.searchForm = this.fb.group({
      cnic: ['', Validators.required],
      token: ['', Validators.required],
   },
  
   );
   this.getAllDists();
   this.regisForm = this.fb.group({
    firstname: ['', Validators.required],
    f_hName: ['', Validators.required],
    cellNo: ['', Validators.required],
    gender: ['', Validators.required],
    cnic: ['', Validators.required],
    dob: ['', Validators.required],
    address: ['', Validators.required],
    village: ['', Validators.required],
    district: ['', Validators.required],
    tehsil_city: ['', Validators.required],
    uc: ['', Validators.required],
    year: ['', Validators.required],
    months: ['', Validators.required],
   
 },

 );
   }
  
  openModAdd(captureuser: TemplateRef<any>) {
    this.modalRef = this.modalService.show(captureuser, Object.assign({}, { class: 'gray modal-lg' }));

  }

//---------------------search by cnic---------------------
serchBycnic(cc) {
  this.loaderCNIC= true;
  this.model.hospitalID=this.hospitalID;
  this.model.cnic=this.searchForm.value.cnic;
  // this.model.token=this.searchForm.value.token;
  console.log('model ==', this.model);
  this.receptService.searchBycnic(this.model).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response====',response);
        // response.medicines.forEach(v => {
        //   this.medStr = v.itemName + ", "+ v.unit+ " "+ v.type;                                      
        //   this.gettreatmetData.push({"itemName":this.medStr,v});
        //   // console.log('gettreatmetData==',this.gettreatmetData)
        // });
        this.nicResponseArray=response.data;
      console.log('this.cnicresponseArray==',this.nicResponseArray);
      this.openModAdd(cc);
        this.loaderCNIC = false;
        
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderCNIC = false;
        alert('Problem in service! please Try again')
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}
//--------------------------------

//---------------------search by token---------------------
serchByToken(cc) {
  this.loaderToken= true;
  this.model1.hospitalID=this.hospitalID;
  this.model1.tokenID=this.searchForm.value.token;
  // this.model.token=this.searchForm.value.token;
  console.log('model1 ==', this.model1);
  this.receptService.searchByTokenPMS(this.model1).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response2====',response);
        
        this.tokenResponseObj=response.data;
      console.log('this.tokenResponseArray==',this.tokenResponseObj);
      this.openModAdd(cc);
        this.loaderToken = false;
        
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderToken = false;
        alert('Problem in service! please Try again')
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}

//--------------------------------

//---------------------search by token---------------------
registerNewPat(formval) {
 
  this.loaderNew= true;
  this.model2.hospitalID=this.hospitalID;
  this.model2.firstname =formval.firstname;
  this.model2.lastname  ='';
  this.model2.dob  =formval.dob;
  this.model2.f_hName  =formval.f_hName;
  this.model2.cellNo  =formval.cellNo;
  this.model2.gender  =formval.gender;
  this.model2.cnic  =formval.cnic;
  this.model2.village  =formval.village;
  this.model2.uc =formval.uc;
  this.model2.tehsil_city  =formval.tehsil_city;
  this.model2.district  =formval.district; 
  this.model2.address  =formval.address;
  // this.model2.age  =this.searchForm.value.token;
 
 
  console.log('model2 ==', this.model2);
  this.receptService.insertpatientpms(this.model2).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response2====',response);
        
      // this.tokenResponseObj=response.data;
      // console.log('this.tokenResponseArray==',this.tokenResponseObj);
      //this.openModAdd(cc);
        this.loaderNew = false;
        this.regisForm.reset();
        alert("patient added successfuly")
        
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderNew = false;
        alert('Problem in service! please Try again')
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}
//-------------------goto next page
gotoAdmitDetails(obpat){
  console.log("patData===",obpat,)
 // localStorage.setItem('wardData',JSON.stringify(obpat));
  //localStorage.setItem('tab',this.tab);
 // this.router.navigate(['ward-list/admitted'])
}
//-------------------goto next page

//---------------get dists-------
//---------------------search by cnic---------------------
getAllDists() {
  this.loaderDists= true;
  this.model3.hospitalID=this.hospitalID;
  
  console.log('model3 ==', this.model3);
  this.receptService.getDists(this.model3).subscribe(
    (response: any) => {
      if (response.status === 0) {
       
         this.distResponseArray=response.data;
         console.log('this.distResponseArray==',this.distResponseArray);
         this.loaderDists = false;
        
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderDists = false;
        alert('Problem in service! please Try again')
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}
//--------get dists-----------
//---------------------search by cnic---------------------
getDistTehsils(did) {
  this.loaderTehsil= true;
  this.model4.hospitalID=this.hospitalID;
  this.model4.districtID=did;
  
  console.log('model4 ==', this.model4);
  this.receptService.gettehsil(this.model4).subscribe(
    (response: any) => {
      if (response.status === 0) {
       
         this.tehsilsResponseArray=response.data;
         console.log('this.tehsilsResponseArray==',this.tehsilsResponseArray);
         this.loaderTehsil = false;
        
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderTehsil = false;
        alert('Problem in service! please Try again')
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}
//--------get dists-----------

//---------------------search by cnic---------------------
getUCs(did) {
  this.loaderUc= true;
  this.model5.hospitalID=this.hospitalID;
  this.model5.tehsilID=did;
  
  console.log('model5 ==', this.model5);
  this.receptService.getUC(this.model5).subscribe(
    (response: any) => {
      if (response.status === 0) {
       
         this.ucResponseArray=response.data;
         console.log('this.ucResponseArray==',this.ucResponseArray);
         this.loaderUc = false;
        
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderUc = false;
        alert('Problem in service! please Try again')
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}
//--------get dists-----------
//----reset form
resetForm(){
  this.regisForm.reset();
}
//reset form

onselectDist(distId,ev){
  console.log("dist event===",ev);
console.log("dist data===",distId);
this.getDistTehsils(distId);
}

onselectTehsil(tehId){
  console.log("tehsil data===",tehId);
  this.getUCs(tehId);
  }
  onselectUC(ucId){
    console.log("uc data===",ucId);
    this.ucID=ucId;
   // this.getUCs(ucId);
    }
  
}

