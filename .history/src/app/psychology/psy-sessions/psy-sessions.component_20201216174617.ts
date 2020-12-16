import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { PsyServicesService } from '../servies/psy-services.service';
@Component({
  selector: 'ncri-psy-sessions',
  templateUrl: './psy-sessions.component.html',
  styleUrls: ['./psy-sessions.component.scss']
})
export class PsySessionsComponent implements OnInit {

  userData: any = {};
  model5: any = {};
  model6: any = {};
  loader_eqp: boolean = false;
  responseText: any = '';
  tab: string = 'newPats';
  pharmacyData1: any = [];
  patData:any=[];
  modalRef: BsModalRef;

  activateLoader: boolean = false;
  deactivateLoader: boolean = false;

  errormsg: string;
  beds: any = {};
  userDataRow: any = {};
  admit: any = {};
  loader_eqp2: boolean = false;
  userID:any;
  model7:any={};
  constructor(
    private modalService: BsModalService,
    private router: Router,
    private psyService: PsyServicesService
  ){

  }
  ngOnInit(): void {
    this.userData.hospitalID = localStorage.getItem('hospitalID');
    
    this.userData.doctorID = localStorage.getItem('docId');
    this.patData = JSON.parse(localStorage.getItem('sessionData')) ;
    console.log('ptid===',this.patData.ptID)
    

    this.getPsyclogicals();
  }
  openModalbedmanag(template: TemplateRef<any>, data) {
    this.userDataRow = data;
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }, this.userDataRow));

   
  }
  openModalpending(template1: TemplateRef<any>, data) {
    this.userDataRow = data;
    this.modalRef = this.modalService.show(template1, Object.assign({}, { class: 'modal-lg' }, this.userDataRow));
    console.log('modal beds data==', this.userDataRow)
    
  }
  openDeleteUser(deleteUser: TemplateRef<any>, data) {
    this.userDataRow = data;
    this.modalRef = this.modalService.show(deleteUser, this.userDataRow);
    
  }
  openModedit(usersEdit: TemplateRef<any>,dataOb) {
    
    this.userDataRow = dataOb;
    this.modalRef = this.modalService.show(usersEdit, Object.assign({}, { class: 'modal-lg' }, this.userData)); //, this.userData  //, data
    console.log('user data====',this.userData);
   this.showEditData(this.userData)
     //this.modalRef.content.userActivate = 'Close';
  }
  showEditData(edtObj){
    this.EuserOb.id=edtObj.id;
    this.EuserOb.Ename=edtObj.name;
    this.EuserOb.Edes=edtObj.designation;
    this.EuserOb.Ejoining=edtObj.joiningDate;
    this.EuserOb.Econtact=edtObj.contact;
    this.EuserOb.Euname=edtObj.username;
    this.EuserOb.Epassword=edtObj.password;
    this.EuserOb.Estatus=edtObj.status;
  }
  openDeleteModal(userdelete: TemplateRef<any>,dataOb) {
    this.userID = dataOb.id;
    this.modalRef = this.modalService.show(userdelete, Object.assign({}, { class: 'modal-sm' }, this.userData)); //, this.userData  //, data
    console.log('user data====',this.userID);
  
  }
  getPsyclogicals() {
    this.loader_eqp2 = true;
    this.model5.ptID=this.patData.ptID
   
    //this.model5.search=this.selected;
    this.psyService.getPsychological(this.model5).subscribe(
      (response: any) => {
        if (response.status === 0) {
          console.log('response==', response)
          this.pharmacyData1 = response.data;
          console.log('this.pharmacy pats==', this.pharmacyData1)
          this.loader_eqp2 = false;
        }
        if (response.status === 1) {
          this.errormsg = response.errors;
          this.loader_eqp2 = false;
          console.log('error=', this.errormsg);

        }
      },
      (error) => { }
    );
  }
  
 
  //get all diagnostic list

  
  addSession(dta) {
    console.log('session data==', dta);
    this.loader_eqp2 = true;
    this.model6.ptID=this.patData.ptID,
    this.model6.behavior=dta.behavior || 0,
    this.model6.cognitive=dta.Cognitive || 0,
    this.model6.cognitive_behavioral=dta.cog_beh || 0,
    this.model6.humanistic=dta.Humanistic || 0,
    this.model6.referred=dta.Clinician || 0,
    this.model6.consent=dta.Feedback || 0,
    this.model6.other=dta.other,
    this.model6.hospitalID = localStorage.getItem('hospitalID');
   
    
    this.psyService.addPsychological(this.model6).subscribe(
      (response: any) => {
        if (response.status === 0) {
          console.log('response==', response)
          // this.pharmacyData1 = response.data;
          // console.log('this.pharmacy pats==', this.pharmacyData1)
          this.loader_eqp2 = false;
          this.modalRef.hide();
          this.getPsyclogicals()
        }
        if (response.status === 1) {
          this.errormsg = response.errors;
          this.loader_eqp2 = false;
          console.log('error=', this.errormsg);

        }
      },
      (error) => { }
    );
  }
  
  gotoAdmitDetails(obpat) {
    console.log("patData===", obpat, "tab data==", this.tab)
    localStorage.setItem('wardData', JSON.stringify(obpat));
    localStorage.setItem('tab', this.tab);
    this.router.navigate(['ward/admitted'])
  }
  gotoDischargeDetails(obpat) {
    console.log("patData===", obpat, "tab data==", this.tab)
    localStorage.setItem('wardData', JSON.stringify(obpat));
    localStorage.setItem('tab', this.tab);
    this.router.navigate(['ward/discharged'])
  }
  deleteSession(){
    this.model7.id = this.userID;
   
    
    this.psyService.deletePsychological(this.model7).subscribe(
      (response: any) => {
        if (response.status === 0) {
          console.log('response==', response)
          // this.pharmacyData1 = response.data;
          // console.log('this.pharmacy pats==', this.pharmacyData1)
          this.loader_eqp2 = false;
          this.modalRef.hide();
          this.getPsyclogicals()
        }
        if (response.status === 1) {
          this.errormsg = response.errors;
          this.loader_eqp2 = false;
          console.log('error=', this.errormsg);

        }
      },
      (error) => { }
    ); 
  }

}
