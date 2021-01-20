import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService, AuthService, APP_CONFIG } from '../../core';

@Component({
  selector: 'ncri-print-prescription',
  templateUrl: './print-prescription.component.html',
  styleUrls: ['./print-prescription.component.scss']
})
export class PrintPrescriptionComponent implements OnInit {

  printPage() {
    window.print();
  }

  userLoader: boolean;
  diagnosisArr: any = [];
  userList: any = [];
  param: { crp: any; hospitalID: any; };
  patInfo: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.patInfo = JSON.parse(localStorage.getItem("uPresData"));
    this.getPatPrescrib(this.patInfo);
  }
  //patient prescription list
  getPatPrescrib(obj: any) {
    this.param = { 'crp': obj.token, 'hospitalID': obj.hospitalID };
    this.userLoader = true;
  }

}
