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
  loader_eqp: boolean = false;
  responseText: any = '';
  tab: string = 'newPats';
  pharmacyData: any = [];
  modalRef: BsModalRef;
  
  activateLoader: boolean = false;
  deactivateLoader: boolean = false;
 
  errormsg:string;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private wardService:WardServiceService
  ) {

  }
  ngOnInit(): void {
    this.userData.hospitalID=localStorage.getItem('hospitalID');
    this.userData.status=13; // 13 is for pending patients 14 for seen patients
    this.userData.doctorID=localStorage.getItem('docId');
    this.getPharmaPats(this.userData);
   }

   openModalbedmanag(template: TemplateRef<any>, data) {
    this.userData = data;
    this.modalRef = this.modalService.show(template, this.userData);
    // this.modalRef.content.userActivate = 'Close';
  }
  openModalpending(template1: TemplateRef<any>, data) {
    this.userData = data;
    this.modalRef = this.modalService.show(template1, this.userData);
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
      this.userData.status = 13;
      this.getPharmaPats(this.userData)
    };
    if (tab == 'penPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 1;
      this.getPharmaPats(this.userData)
    };
    if (tab == 'seenPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 14;
      this.getPharmaPats(this.userData)
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
