import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {epiService} from "../epi.serivce"
@Component({
  selector: 'ncri-child-vaccination',
  templateUrl: './child-vaccination.component.html',
  styleUrls: ['./child-vaccination.component.scss']
})
export class ChildVaccinationComponent implements OnInit {
  patInfo: any={};
  userLoader: boolean;
  paramData: any={};
  detail: any={};

  constructor(  private eService: epiService,
    private router: Router) { }

  ngOnInit(): void {
    this.patInfo =localStorage.getItem("patData");
    this.detail =localStorage.getItem("details");

    this.getchildrenepischedule();
  }
  getchildrenepischedule(){
debugger
    this.userLoader=true;
    this.paramData= {"tokenID":this.detail.token,"hospitalID":this.detail.hospitalID,"patientID":this.patInfo.patientID,"departmentID":this.patInfo.departmentID}

    this.eService.getchildrenepischedule(this.paramData).subscribe((response: any) => {
      if (response.status == 0) {
                this.userLoader = false;
      } else {
        this.userLoader = false;
        alert('Something went wrong try again');
      }
    },
      (error) => { }
    );
  }

}
