import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse'; 
import { AdminServiceService } from '../services/admin-service.service';

import { AfterViewInit,  ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'ncri-covid-report-pat',
  templateUrl: './covid-report-pat.component.html',
  styleUrls: ['./covid-report-pat.component.scss']
})
export class CovidReportPatComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtInstance: DataTables.Api;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  //dtTrigger: Subject = new Subject();
  dtTrigger: Subject<any> = new Subject();
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

  constructor(
    private modalService: BsModalService,
     private fb: FormBuilder,
      private adminService:AdminServiceService,

      ) {

  }

  ngOnInit(): void {
    var today = new Date();

var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
console.log('date==',date);
this.medOb.startDate=date;
this.medOb.endtDate=date;
// setTimeout(function(){ alert("Hi"); }, 2000);
this.dtOptions = {
  pagingType: 'full_numbers',
  pageLength: 25,
  dom: 'lBfrtip',
 // buttons: ['print', 'excel'],
};
    this.searchReport(this.medOb);
   }
//for datatables
   ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
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
          this.reporData = response.data;
          console.log('all reportdata==', this.reporData);
          this.rerender();
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
