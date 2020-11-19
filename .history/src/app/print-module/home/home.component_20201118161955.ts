import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'ncri-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  printPage() {
    window.print();
  }
  
  param: any = {};
  userLoader: boolean = false;
  userList: any = [];
  patInfo: any = {};
  diagnosisArr: any = [];
  daig: any = [];

  constructor(private modalService: BsModalService,
    private router: Router,
    private printService:ServiceService) { }

  ngOnInit(): void {
    this.patInfo = JSON.parse(localStorage.getItem("pharmacyData"));
    console.log('patInfo2====', this.patInfo)
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
