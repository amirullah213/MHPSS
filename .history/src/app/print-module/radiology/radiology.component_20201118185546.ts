import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'ncri-radiology',
  templateUrl: './radiology.component.html',
  styleUrls: ['./radiology.component.scss']
})
export class RadiologyComponent implements OnInit {

  printPage() {
    window.print();
  }
  
  param: any = {};
  userLoader: boolean = false;
  userList: any = [];
  patInfo: any = {};
  diagnosisArr: any = [];
  daig: any = [];
  hospitalID:any;
  doctorID:any;
  userType:any;
  pathData1:any={};
  userData:any={};



  constructor(
    private router: Router,
    private printService:ServiceService) { }

  ngOnInit(): void {
    this.hospitalID=localStorage.getItem('hospitalID');
    this.doctorID=localStorage.getItem('docId');
    this.userType=localStorage.getItem('userType');
    this.pathData1=JSON.parse(localStorage.getItem('pathDetails'));
   console.log('pathData1===',this.pathData1);

   this.userData=JSON.parse(localStorage.getItem('pathologyPrint')) ;
   console.log('pathologyPrint===',this.userData);
    //this.getPatPrescrib(this.patInfo);
  }

  

}
