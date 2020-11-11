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
  

  constructor(
    private modalService: BsModalService,
     private fb: FormBuilder,
     private otServices: OtServiceService,
     private router: Router,
  ) {

  }
  ngOnInit(): void {
    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');
    this.userType=localStorage.getItem('userType');
    this.userData.status = 11;
   this.getUsersPending( this.userData);

  }

  openModalActivate(userActivate: TemplateRef<any>, data) {
    this.userData = data;
    this.modalRef = this.modalService.show(userActivate, this.userData);
    // this.modalRef.content.userActivate = 'Close';
  }
  openModalDeactivate(userDeactivate: TemplateRef<any>, data) {
    this.userData = data;
    this.modalRef = this.modalService.show(userDeactivate, this.userData);
    // this.modalRef.content.userActivate = 'Close';
  }

  openDeleteUser(deleteUser: TemplateRef<any>, data) {
    this.userData = data;
    this.modalRef = this.modalService.show(deleteUser, this.userData);
    // this.modalRef.content.userActivate = 'Close';
  }
  //set tab
  setTab(tab: string) {
    if (tab == 'newPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 11;
      this.getUsersPending(this.userData);
    };
    // if (tab == 'penPats') {
    //   console.log('tab==', tab);
    //   this.tab = tab;
    //   this.userData.status = 1;
    //   this.getUsersPending(this.userData)
    // };
    if (tab == 'seenPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 12;
      this.getUsersPending(this.userData)
    };
  }
  
//---------------------get all lab patients---------------------
getUsersPending(cc) {
  this.userLoader= true;
  this.model.hospitalID=this.hospitalID;
 
  this.model.doctorID=this.doctorID;
  this.model.status=cc.status;
 
  console.log('model ==', this.model);
  this.otServices.getPatList(this.model).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(' response====',response);
        // response.medicines.forEach(v => {
        //   this.medStr = v.itemName + ", "+ v.unit+ " "+ v.type;                                      
        //   this.gettreatmetData.push({"itemName":this.medStr,v});
        //   // console.log('gettreatmetData==',this.gettreatmetData)
        // });
        this.PathResponseArray=response.data;
      console.log('this.PathResponseArray==',this.PathResponseArray);
     // this.openModAdd(cc);
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