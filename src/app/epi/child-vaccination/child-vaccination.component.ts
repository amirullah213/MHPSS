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
  epiData: any=[{"sr": 1,
  "when": "At Birth",
  "age": "At Birth",
  "vaccines": "BCG,OPV-0,Hep-B"}
,
{"sr":2 ,
    "when": "At Birth",
    "age": "At Birth",
    "vaccines": "BCG,OPV-0,Hep-B"},
    {"sr": 3,
    "when": "At Birth",
    "age": "At Birth",
    "vaccines": "BCG,OPV-0,Hep-B"}
  ,
  {"sr": 4,
  "when": "At Birth",
  "age": "At Birth",
  "vaccines": "BCG,OPV-0,Hep-B"},
  {"sr": 5,
  "when": "At Birth",
  "age": "At Birth",
  "vaccines": "BCG,OPV-0,Hep-B"},
  {"sr": 6,
  "when": "At Birth",
  "age": "At Birth",
  "vaccines": "BCG,OPV-0,Hep-B"}];
  epiRes: any=[];

  constructor(  private eService: epiService,
    private router: Router) { }

  ngOnInit(): void {
    this.patInfo =JSON.parse(localStorage.getItem("patData"));
    this.detail =JSON.parse(localStorage.getItem("details"));

    this.getchildrenepischedule();
  }
  getchildrenepischedule(){
debugger
    this.userLoader=true;
    this.paramData= {"tokenID":this.patInfo.token,"hospitalID":this.detail.hospitalID,"patientID":this.patInfo.patientID,"departmentID":this.patInfo.departmentID}

    this.eService.getchildrenepischedule(this.paramData).subscribe((response: any) => {
      if (response.status == 0) {
        this.epiRes = response.data

        if(this.epiRes.length==0)
        {



        }
        else{

        }
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
