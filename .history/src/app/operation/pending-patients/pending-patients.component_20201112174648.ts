import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { OtServiceService } from '../services/ot-service.service';

@Component({
  selector: 'ncri-pending-patients',
  templateUrl: './pending-patients.component.html',
  styleUrls: ['./pending-patients.component.scss']
})
export class PendingPatientsComponent implements OnInit {
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
  hospitalID:any;
  doctorID:any;
  model:any={};
  model3:any={};
  PathResponseArray:any=[];
  errormsg:any;
  userType:any
  otDetails:any={};
  dynamicForm:FormGroup;
  userLoader2:boolean=false;
  modelWard:any={};
  modelInvest:any={};
  wardArr:any=[];
  diagnosArr:any=[];
  diagnosArr2:any=[];
  diagObj:any={};
  modalToken:any={};

  constructor(
    private modalService: BsModalService,
     private fb: FormBuilder,
     private otServices: OtServiceService,
     private router: Router,
  ) {

  }
  ngOnInit(): void {
    this.dynamicForm = this.fb.group({
      anesthesiaType: ['', Validators.required],
      operationName: ['', Validators.required],
      surgeonName: ['', Validators.required],
      anethetistName: ['', Validators.required],
      remarks: ['', Validators.required],

      selectedValueIndoorDiag: ['', Validators.required],
      ref: ['', Validators.required],
      

      
     
  });
    this.otDetails=JSON.parse(localStorage.getItem('otDetails'))
    console.log("otDetails===",this.otDetails)
    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');
    this.userType=localStorage.getItem('userType');
    this.userData.status = 11;
   this.getOperationTheatreData();
   this.getWards();
   this.getDiagnosis();

  }

  
  
  
//---------------------get ot form data---------------------
getOperationTheatreData() {
  this.userLoader= true;
  this.model.hospitalID=this.hospitalID;
  this.model.tokenID=this.otDetails.ptID;
  
 console.log('model ==', this.model);
  this.otServices.getOperationTheatre(this.model).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response====',response);
        this.PathResponseArray=response.data;
        console.log('this.PathResponseArray==',this.PathResponseArray);
        this.userLoader = false;
        this.dynamicForm.setValue({
          anesthesiaType:  this.PathResponseArray.anesthesiaType,
          operationName: this.PathResponseArray.operationName,
          surgeonName: this.PathResponseArray.surgeonName,
          anethetistName: this.PathResponseArray.anethetistName,
          remarks: this.PathResponseArray.remarks,
        })
        
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.userLoader = false;
        alert('Problem in service! please Try again')
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}
//--------------------------------
//---------------------get all lab patients---------------------
updateOperationData(fromData) {
  console.log("Form data==",fromData)
  this.userLoader2= true;
  this.model3.hospitalID=this.hospitalID;
  this.model3.tokenID=this.otDetails.ptID;
  this.model3.anesthesiaType=fromData.anesthesiaType;
  this.model3.operationName=fromData.operationName;
  this.model3.surgeonName=fromData.surgeonName;
  this.model3.anethetistName=fromData.anethetistName;
  this.model3.remarks=fromData.remarks;
  
 console.log('model ==', this.model);
  this.otServices.updateOperationTheatre(this.model3).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response====',response);
        this.PathResponseArray=response.data;
        console.log('this.PathResponseArray==',this.PathResponseArray);
        this.userLoader2 = false;
        this.router.navigate(['ot/home']);
        
        
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.userLoader2 = false;
        alert('Problem in service! please Try again')
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}
//--------------------------------
//-------------------goto next page
gotopathdetail(obpat){
  console.log("patData===",obpat)
  localStorage.setItem('otDetails',JSON.stringify(obpat));
 // this.modalRef.hide();
  //localStorage.setItem('tab',this.tab);
  this.router.navigate(['ot/pending'])
}

//-------------------goto next page
gotopathdetailSeen(obpat){
  console.log("patData===",obpat)
  localStorage.setItem('pathDetails',JSON.stringify(obpat));
 // this.modalRef.hide();
  //localStorage.setItem('tab',this.tab);
  this.router.navigate(['lab-rad/seen'])
}

//---------------------get wards ward admision---------------------
getWards() {
  this.userLoader= true;
  this.modelWard.hospitalID=this.hospitalID;
  // this.model.tokenID=this.otDetails.ptID;
  
 console.log('modelWard ==', this.modelWard);
  this.otServices.getIndoorList(this.modelWard).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response for wards====',response);
        this.wardArr=response.data;
        this.userLoader = false;
       
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.userLoader = false;
        alert('Problem in service! please Try again')
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}
//--------------------------------
//---------------------get wards ward admision---------------------
getDiagnosis() {
  this.userLoader= true;
  
  
 console.log('modelInvest ==', this.modelInvest);
  this.otServices.getIndoorDiagnosis(this.modelInvest).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response for investigation====',response);
        this.diagnosArr=response.data
        this.userLoader = false;
       
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.userLoader = false;
        alert('Problem in service! please Try again')
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}
//--------------------------------


onSelectDiagnos(edat){
  console.log('edat',edat.item);
  
 // this.diagnosArr.push(edat.item);
   
   
   this.diagnosArr2.push({"name":edat.item.name,"id":edat.item.id});
   this.dynamicForm.patchValue({
    selectedValueIndoorDiag: '',
    
  });
  console.log('this.diagnosArr2',this.diagnosArr2);
}
removeDiag(indx){
  this.diagnosArr2.splice(indx, 1);
  console.log('$x==',this.diagnosArr2)
}

changeRefVal(evt){
  console.log('$evt==',evt)
}


generatetoken() {
  this.userLoader= true;
  this.modalToken.hospitalID=this.hospitalID;
  this.modalToken.patientID=this.hospitalID;

  this.modalToken.departmentID=this.hospitalID;
  this.modalToken.diagnosis=this.hospitalID;
  this.modalToken.isIndoor=1;
  this.modalToken.ptID=this.hospitalID;
  this.modalToken.refferedFrom=-1;
  
 console.log('modalToken ==', this.modalToken);
  this.otServices.getIndoorDiagnosis(this.modalToken).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response for investigation====',response);
        this.diagnosArr=response.data
        this.userLoader = false;
       
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.userLoader = false;
        alert('Problem in service! please Try again')
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}
}
