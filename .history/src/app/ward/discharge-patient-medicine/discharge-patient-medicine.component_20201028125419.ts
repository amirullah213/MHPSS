import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { WardServiceService } from '../service/ward-service.service';

@Component({
  selector: 'ncri-discharge-patient-medicine',
  templateUrl: './discharge-patient-medicine.component.html',
  styleUrls: ['./discharge-patient-medicine.component.scss']
})
export class DischargePatientMedicineComponent implements OnInit {
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
  outdoorData:any =[];
  errormsg:string;
  hospitalID:any;
  doctorID:any;
  indoor:any;
  detailsData:any={};

  constructor(
    private router: Router,
    private wardService:WardServiceService
  ) { }

  ngOnInit(): void {
    this.indoor= localStorage.getItem('indoorID');
    this.detailsData=JSON.parse(localStorage.getItem('wardData')) ;

    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');
    this.getoutDoorData();
  }
  gotoPatDetailsPending(obpat){
    console.log("patData===",obpat,"tab data==",this.tab)
    localStorage.setItem('pharmacyData',JSON.stringify(obpat));
    localStorage.setItem('tab',this.tab);
    this.router.navigate(['pharma/pending'])
  }
}
