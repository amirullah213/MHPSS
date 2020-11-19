import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { WardServiceService } from '../service/ward-service.service';
@Component({
  selector: 'ncri-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userData: any = {};
  model5: any = {};
  model6: any = {};
  loader_eqp: boolean = false;
  responseText: any = '';
  tab: string = 'newPats';
  pharmacyData: any = [];
  modalRef: BsModalRef;
  
  activateLoader: boolean = false;
  deactivateLoader: boolean = false;
 
  errormsg:string;
  beds:any ={};
  userDataRow:any={};
  admit:any={};

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private wardService:WardServiceService
  ) {

  }
  ngOnInit(): void {
    this.userData.hospitalID=localStorage.getItem('hospitalID');
    this.userData.status=5; // 13 is for pending patients 14 for seen patients//status gives error thing due to status used in error.status
    this.userData.doctorID=localStorage.getItem('docId');
    this.getWardPats(this.userData);
   }

   openModalbedmanag(template: TemplateRef<any>, data) {
    this.userDataRow = data;
    this.modalRef = this.modalService.show(template, this.userDataRow);

    // this.modalRef.content.userActivate = 'Close';
  }
  openModalpending(template1: TemplateRef<any>, data) {
    this.userDataRow = data;
    this.modalRef = this.modalService.show(template1, this.userDataRow);
    console.log('modal beds data==',this.userDataRow)
    // this.modalRef.content.userActivate = 'Close';
  }

  openDeleteUser(deleteUser: TemplateRef<any>, data) {
    this.userDataRow = data;
    this.modalRef = this.modalService.show(deleteUser, this.userDataRow);
    // this.modalRef.content.userActivate = 'Close';
  }
  //set tab
  setTab(tab: string) {
    if (tab == 'newPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 5;
      this.getWardPats(this.userData)
    };
    if (tab == 'penPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 6;
      this.getWardPats(this.userData)
    };
    if (tab == 'seenPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 7;
      this.getWardPats(this.userData)
    };
  }
 //get all diagnostic list
 getWardPats(patObj) {
  this.loader_eqp = true;
  //this.model5.search=this.selected;
 this.wardService.getWardPats(patObj).subscribe(
    (response: any) => {
      if (response.status === 0) {
        this.pharmacyData = response.data;
      console.log('this.pharmacy pats==',this.pharmacyData)
        this.loader_eqp = false;
      }
  if (response.status === 1) {
        this.errormsg = response.errors;
        this.loader_eqp = false;
        console.log('error=', this.errormsg);
        //this._loginserviceService.logout();
      }
    },
    (error) => {}
  );

}
//get all diagnostic list

 //get all diagnostic list
 setBedsPms(patObj) {
  this.loader_eqp = true;
  this.model5.femaleBeds=patObj.female;
  this.model5.maleBeds=patObj.male;
  this.model5.totalBeds=patObj.total;
  this.model5.id=localStorage.getItem('docId');
  this.model5.hospitalID=localStorage.getItem('hospitalID');
 
 this.wardService.setbeds(this.model5).subscribe(
    (response: any) => {
      if (response.status === 0) {
       
      console.log('this.ward added pats==',response.data)
        this.loader_eqp = false;
       this.modalRef.hide()
        alert('Done Successfuly')
      }
     if (response.status === 1) {
        this.errormsg = response.error;
        this.loader_eqp = false;
        console.log('error=', this.errormsg);
        alert('Pronlem in service, please try again')
        //this._loginserviceService.logout();
      }
    },
    (error) => {}
  );

}

//get all diagnostic list
admitPatient(patObj) {
  this.loader_eqp = true;
  this.model6.femaleBeds=patObj.female;
  this.model6.maleBeds=patObj.male;
  this.model6.totalBeds=patObj.total;
  this.model6.id=localStorage.getItem('docId');
  this.model6.hospitalID=localStorage.getItem('hospitalID');
 
 this.wardService.setbeds(this.model6).subscribe(
    (response: any) => {
      if (response.status === 0) {
       
      console.log('this.ward added pats==',response.data)
        this.loader_eqp = false;
       this.modalRef.hide()
        alert('Done Successfuly')
      }
     if (response.status === 1) {
        this.errormsg = response.error;
        this.loader_eqp = false;
        console.log('error=', this.errormsg);
        alert('Pronlem in service, please try again')
        //this._loginserviceService.logout();
      }
    },
    (error) => {}
  );

}
//get all diagnostic list
gotoPatDetailsSeen(obpat){
    console.log("patData===",obpat,"tab data==",this.tab)
    localStorage.setItem('pharmacyData',JSON.stringify(obpat));
    localStorage.setItem('tab',this.tab);
    this.router.navigate(['pharma/seen'])
}
gotoPatDetailsPending(obpat){
  console.log("patData===",obpat,"tab data==",this.tab)
  localStorage.setItem('pharmacyData',JSON.stringify(obpat));
  localStorage.setItem('tab',this.tab);
  this.router.navigate(['pharma/pending'])
}
}
