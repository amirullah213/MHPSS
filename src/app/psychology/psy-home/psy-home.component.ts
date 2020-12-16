import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { PsyServicesService } from '../servies/psy-services.service';

@Component({
  selector: 'ncri-psy-home',
  templateUrl: './psy-home.component.html',
  styleUrls: ['./psy-home.component.scss']
})
export class PsyHomeComponent implements OnInit {
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

  errormsg: string;
  beds: any = {};
  userDataRow: any = {};
  admit: any = {};
  loader_eqp2: boolean = false;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private psyService: PsyServicesService
  ){

  }
  ngOnInit(): void {
    this.userData.hospitalID = localStorage.getItem('hospitalID');
    this.userData.status = 18; // 13 is for pending patients 14 for seen patients//status gives error thing due to status used in error.status
    this.userData.doctorID = localStorage.getItem('docId');
    this.getOPDPats(this.userData);
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
  //set tab
  setTab(tab: string) {
    if (tab == 'newPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 18;
      this.getOPDPats(this.userData)
    };
    if (tab == 'penPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 19;
      this.getOPDPats(this.userData)
    };
    if (tab == 'seenPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 7;
      this.getOPDPats(this.userData)
    };
  }
  //get all diagnostic list
  getOPDPats(patObj) {
    this.loader_eqp2 = true;
    //this.model5.search=this.selected;
    this.psyService.getPatients(patObj).subscribe(
      (response: any) => {
        if (response.status === 0) {
          console.log('response==', response)
          this.pharmacyData = response.data;
          console.log('this.pharmacy pats==', this.pharmacyData)
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
  gotoSessionPage(obpat) {
    console.log("patData===", obpat, "tab data==", this.tab)
    localStorage.setItem('patData', JSON.stringify(obpat));
    localStorage.setItem('tab', this.tab);
    this.router.navigate(['psychology/sessions'])
  }
  gotoDischargeDetails(obpat) {
    console.log("patData===", obpat, "tab data==", this.tab)
    localStorage.setItem('patData', JSON.stringify(obpat));
    localStorage.setItem('tab', this.tab);
    this.router.navigate(['ward/discharged'])
  }
}
