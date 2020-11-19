import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'ncri-pathology',
  templateUrl: './pathology.component.html',
  styleUrls: ['./pathology.component.scss']
})
export class PathologyComponent implements OnInit {
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

   this.userData=localStorage.getItem('pathologyPrint');
   console.log('pathologyPrint===',this.userData);
    this.getPatPrescrib(this.patInfo);
  }

  //patient prescription list
  getPatPrescrib(obj: any) {
    this.param = { 'crp': obj.token, 'hospitalID': obj.hospitalID };

    this.userLoader = true;
    this.printService.getprescription(this.param).subscribe
      ((response: any) => {
        if (response.status === 0) {
          console.log(response);
          this.userList = response.data;
          console.log('userPresc list===', this.userList);
          //console.log('userPresc list===', JSON.parse(this.userList[0].test[2].xrayFilms6));
         // this.diagnosisArr = JSON.parse(this.userList[0].test[2].xrayFilms6)
          this.diagnosisArr.forEach(function (value) {
            console.log("diagnosisArr", value);
            // this.daig.push(value);
            // console.log("this.daig",this.daig);
          })
          this.userLoader = false;
        } else {
          this.userLoader = false;
          alert('Something went wrong try again');
        }
      },
        (error) => { }
      );
  }
 // patient prescription list

}
