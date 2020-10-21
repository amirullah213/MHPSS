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
  loader_eqp2:boolean=false;
  detailsData:any={};
  hospitalID:any;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private wardService:WardServiceService
  ) {

  }
  ngOnInit(): void {
    this.hospitalID=localStorage.getItem('hospitalID');
    this.detailsData=JSON.parse(localStorage.getItem('wardData')) ;
    console.log('wardData==', this.detailsData);
    
    //this.userData.doctorID=localStorage.getItem('docId');
   // this.getWardPats(this.userData);
   }
   //get all diagnostic list
 getWardPats() {
  this.loader_eqp2 = true;
  this.model5.hospitalID=this.hospitalID;
  this.model5.tokenID=this.detailsData.patientID;
  console.log('modal 5==', this.model5);
//  this.wardService.getWardPats(this.model5).subscribe(
//     (response: any) => {
//       if (response.status === 0) {
//         this.pharmacyData = response.data;
//       console.log('this.pharmacy pats==',this.pharmacyData)
//         this.loader_eqp2 = false;
//       }
//   if (response.status === 1) {
//         this.errormsg = response.errors;
//         this.loader_eqp2 = false;
//         console.log('error=', this.errormsg);
        
//       }
//     },
//     (error) => {}
//   );

}

}