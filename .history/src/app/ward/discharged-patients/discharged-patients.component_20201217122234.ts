import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { WardServiceService } from '../service/ward-service.service';

@Component({
  selector: 'ncri-discharged-patients',
  templateUrl: './discharged-patients.component.html',
  styleUrls: ['./discharged-patients.component.scss']
})
export class DischargedPatientsComponent implements OnInit {
  printPage() {
    window.print();
  }
  userData: any = {};
  model5: any = {};
  model6: any = {};
  loader_eqp: boolean = false;
  responseText: any = '';
  pharmacyData: any = [];
  modalRef: BsModalRef;
  activateLoader: boolean = false;
  deactivateLoader: boolean = false;
  errormsg:string;
  beds:any ={};
  userDataRow:any={};
  admit:any={};
  userLoader:boolean=false;
  detailsData:any={};
  hospitalID:any;
  diagnosis: any = [];
  complaint: any = [];
  patInfo: any = {};
  userList: any = [];
  diag: any;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private wardService:WardServiceService
  ) {

  }
  ngOnInit(): void {
    this.hospitalID=localStorage.getItem('hospitalID');
    this.patInfo=JSON.parse(localStorage.getItem('wardData')) ;
    console.log('wardData==', this.patInfo);

    
    //this.userData.doctorID=localStorage.getItem('docId');
    this.getWardDischargeCard();
   }
   //get all diagnostic list
 getWardDischargeCard() {
  this.userLoader = true;
  this.model5.hospitalID=this.hospitalID;
  this.model5.tokenID=this.patInfo.ptID;
  console.log('modal 5==', this.model5);
  this.wardService.dischargeCard(this.model5).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(response);
        this.userList = response.data;
        // this.diag = JSON.parse(response.data[0].diagnosis)
        console.log('userList===', this.userList);
       
        this.userLoader = false;
        this.userLoader = false;
      }
  if (response.status === 1) {
        this.errormsg = response.errors;
        this.userLoader = false;
        console.log('error=', this.errormsg);
        
      }
    },
    (error) => {}
  );

}

}
