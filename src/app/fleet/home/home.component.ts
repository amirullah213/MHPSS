import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FleetService} from "../fleet.service"
@Component({
  selector: 'ncri-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
  patientsList: any;

  constructor(
    private modalService: BsModalService,
    private router: Router,private fService:FleetService
  ) {

  }
  ngOnInit(): void {
    this.getfleetpatients();
  }

  pDetails(obj){
    debugger

  localStorage.setItem("newPatData",JSON.stringify(obj))
    this.router.navigate(['/fleet/new-patient']);
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
      this.userData.status = 0;
      this.getUsers(this.userData)
    };
    if (tab == 'penPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 1;
      this.getUsers(this.userData)
    };
    if (tab == 'seenPats') {
      console.log('tab==', tab);
      this.tab = tab;
      this.userData.status = 2;
      this.getUsers(this.userData)
    };
  }


  getfleetpatients(){

    this.paramData={"status":0}
    this.fService.getfleetpatients(this.paramData).subscribe((response: any) => {
      if (response.status === 0) {
        this.patientsList = response.data
        this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
  }
  getUsers(obj: any) {

    this.userLoader = true;
  }
}
