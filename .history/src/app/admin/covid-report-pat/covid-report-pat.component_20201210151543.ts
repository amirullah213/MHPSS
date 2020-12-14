import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse'; 
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'ncri-covid-report-pat',
  templateUrl: './covid-report-pat.component.html',
  styleUrls: ['./covid-report-pat.component.scss']
})
export class CovidReportPatComponent implements OnInit {

  printPage() {
    window.print();
  }
  
  loader_eqp:boolean= false;
  reporData:any =[];
  isCollapsed = true;
  errormsg:string;
  medOb:any ={};

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

  ngOnInit(): void {
    var today = new Date();

var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
console.log('date==',date);
this.medOb.startDate=date;
this.medOb.endtDate=date;

    this.searchReport(this.medOb);
   }

   //get all medicine  List
   searchReport(sobj) {
    this.loader_eqp = true;
    
      this.model.startDate=sobj.startDate;
      this.model.endDate=sobj.endtDate;
      this.model.hospitalID=localStorage.getItem('hospitalID');

    this.adminService.covidPats(this.model).subscribe(
     
      (response: any) => {
        if (response.status === 0) {
          this.reporData = response;
          console.log('all reportdata==', this.reporData);
         
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
