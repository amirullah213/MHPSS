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
  PathResponseArray:any=[];
  errormsg:any;
  userType:any
  otDetails:any={};
  dynamicForm:FormGroup;

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
     
  });
    this.otDetails=JSON.parse(localStorage.getItem('otDetails'))
    console.log("otDetails===",this.otDetails)
    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');
    this.userType=localStorage.getItem('userType');
    this.userData.status = 11;
   this.getOperationTheatreData();

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
          operationName: this.PathResponseArray.anethetistName,
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
          operationName: this.PathResponseArray.anethetistName,
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
}