import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
//import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { ServiceService } from '../services/service.service';
@Component({
  selector: 'ncri-discharge-card',
  templateUrl: './discharge-card.component.html',
  styleUrls: ['./discharge-card.component.scss']
})
export class DischargeCardComponent implements OnInit {

  printPage() {
    window.print();
  }
  userData: any = {};
  model5: any = {};
  model6: any = {};
  loader_eqp: boolean = false;
  responseText: any = '';
  pharmacyData: any = [];
  //modalRef: BsModalRef;
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
  invets:any=[];
  complantArray:any=[];
  Details:any={};
  loaderOperate:boolean=false;
  model91:any={};
  operateArr:any=[];
  diagArray:any=[]
  constructor(
    //private modalService: BsModalService,
    private router: Router,
    private printService:ServiceService)
   {

  }
  ngOnInit(): void {
    this.hospitalID=localStorage.getItem('hospitalID');
    this.patInfo=JSON.parse(localStorage.getItem('wardData')) ;
    console.log('wardData==', this.patInfo);
    this.Details=JSON.parse(localStorage.getItem('details'));
   console.log('Details===',this.Details.hospitalName);

    
    //this.userData.doctorID=localStorage.getItem('docId');
    this.getWardDischargeCard();
   }
   //get all diagnostic list
 getWardDischargeCard() {
  this.userLoader = true;
  this.model5.hospitalID=this.hospitalID;
  this.model5.tokenID=this.patInfo.ptID;
  console.log('modal 5==', this.model5);
  this.printService.getDischargeCard(this.model5).subscribe(
    (response: any) => {
      if (response.status === 0) {
        console.log(response);
        this.userList = response.data;
        //calling opearation data
        this.getoperations(this.userList.prescriptionID);
        //calling opearation data ended 
        // this.diag = JSON.parse(response.data[0].diagnosis)
        console.log('userList===', this.userList);
        this.invets=this.userList.investigations
        console.log('investigations===', this.invets);
        this.complantArray=JSON.parse(this.userList.complaints); 
        console.log('complaints===', this.complantArray);
        this.diagArray=JSON.parse(this.userList.diagnosis); 
        console.log('diagArray===', this.diagArray);
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
//get opeartion data in discharge card start
getoperations(presID) {
  this.loaderOperate = true;
  this.model91.prescriptionID=presID;
 
  this.printService.getoperations(this.model91).subscribe(
    (response: any) => {
      if (response.status === 0) {
      
        
        this.operateArr=response;
        console.log('operateArr=', this.operateArr);
        this.loaderOperate = false;
      }
  if (response.status === 1) {
        this.errormsg = response.error;
        this.loaderOperate = false;
        console.log('error=', this.errormsg);
        alert('Problem in service! try again');
        
      }
    },
    (error) => {}
  );
 
}
//get opeartion data in d card ended 
}
