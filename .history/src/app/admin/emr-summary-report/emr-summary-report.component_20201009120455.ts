import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse'; 
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'ncri-emr-summary-report',
  templateUrl: './emr-summary-report.component.html',
  styleUrls: ['./emr-summary-report.component.scss']
})
export class EmrSummaryReportComponent implements OnInit {
  loader_eqp:boolean= false;
  allpathology:any =[];
  isCollapsed = true;
  errormsg:string
  currentDate = new Date();
  form = new FormGroup({
    dateYMD: new FormControl(new Date()),
    dateFull: new FormControl(new Date()),
    dateMDY: new FormControl(new Date()),
    dateRange: new FormControl([
      new Date(),
      new Date(this.currentDate.setDate(this.currentDate.getDate() + 7))
    ])
  });

  model: any = {};
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private fb: FormBuilder, private adminService:AdminServiceService) {

  }

  ngOnInit(): void { }

   //get all medicine  List
   getAllPathList() {
    this.loader_eqp = true;
this.model.testType=2;
    this.adminService.getPatology(this.model).subscribe(
     
      (response: any) => {
        if (response.status === 0) {
          this.allpathology = response.data;
          console.log('all allpathology==', this.allpathology);
         
          //setTimeout(this.rerender, 2500);
         // if(this.allMedcis.length>1){this.rerender();}
          
          //this.rerender();
          //this.dtTrigger.next();
          this.loader_eqp = false;
         
        }

        if (response.status === 1) {
          this.errormsg = response.errors;
          this.loader_eqp = false;
          console.log('error=', this.errormsg);
          //this._loginserviceService.logout();
        }
      },
      (error) => {}
    );
  }
   //get all medicine  List

  //--------------------------------
}

