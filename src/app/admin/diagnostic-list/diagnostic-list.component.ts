import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'ncri-diagnostic-list',
  templateUrl: './diagnostic-list.component.html',
  styleUrls: ['./diagnostic-list.component.scss']
})
export class DiagnosticListComponent implements OnInit {
  showTable:boolean=false;
  diagnosis: any = [];
  selected: any='';
  userOb: any = {};
  EuserOb: any = {};
  dtOptions: any = {};
  model: any = {};
  model2: any = {};
  modalRef: BsModalRef;
  model5: any = {};
  model10: any = {};
  allDiag: any = [];
  loader_eqp: boolean = false;
  errormsg: string;
  userData: any = {};
  userID: number;
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;
  selectedData:any={};
  model9:any={};
  Diagnosticname:any;
  ambID:number;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  //dtTrigger: Subject = new Subject();
  dtTrigger: Subject<any> = new Subject();


  constructor(
    private modalService: BsModalService,
    private adminService: AdminServiceService
  ) { }

  ngOnInit() {

    this.getAllDiagnostics();
  }
 
  openModAdd(diagnosticAdd: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      diagnosticAdd,
      Object.assign({}, { class: 'modal-lg' })
    );
  }
  
  
  //get all diagnostic list
  getAllDiagnostics() {
    this.loader_eqp = true;

    this.model5.search = this.selected;
    console.log('this.selected.length==', this.selected.length)
    if (this.selected.length >= 3) {
      this.adminService.searchDiagnosis(this.model5).subscribe(
        (response: any) => {
          if (response.status === 0) {
            this.diagnosis = response.data;
            console.log('this.diagnosis==', this.diagnosis);
            this.loader_eqp = false;
            
            
          }

          if (response.status === 1) {
            this.errormsg = response.error;
            this.loader_eqp = false;
            console.log('error=', this.errormsg);
            alert('Error in Service! Refresh the page')
            //this._loginserviceService.logout();
          }
        },
        (error) => { }
      );
    }
  }
  //get all diagnostic list
  showData(td) {
    console.log('show data==', td)
  }
  onSelectDiagnos(sdata){
    this.showTable=true;
    this.selectedData=sdata.item;
    console.log('selected data==',this.selectedData);
  }

  //add diagnosis
  addNewDiagnosis(dNam) {
    this.loader_eqp = true;

    this.model9.name = dNam;
    console.log('this.selected.length==', this.model9)
   
      this.adminService.addDiagnosis(this.model9).subscribe(
        (response: any) => {
          if (response.status === 0) {
            
            this.modalRef.hide()
            this.loader_eqp = false;
            this.showTable=false;
            alert("Diagnosis Added Successfuly");
          }

          if (response.status === 1) {
            this.errormsg = response.error;
            this.loader_eqp = false;
            console.log('error=', this.errormsg);
            alert('Error in Service! Refresh the page')
            //this._loginserviceService.logout();
          }
        },
        (error) => { }
      );
    
  }
  //get all diagnostic list
  openModdelete(Ambdelete: TemplateRef<any>,dataOb) {
    this.ambID = dataOb;
    this.modalRef = this.modalService.show(Ambdelete, Object.assign({}, { class: 'modal-sm' }));
    console.log('med id====',this.ambID);
  }
  //add diagnosis
  deleteDiagnosis() {
    this.loader_eqp = true;

    this.model10.id = this.ambID;
    console.log('this.selected.length==', this.model10)
   
      this.adminService.deletDiagnosis(this.model10).subscribe(
        (response: any) => {
          if (response.status === 0) {
            
            this.modalRef.hide();
            this.showTable=false;
            this.loader_eqp = false;
            this.selectedData={};
            this.selected='';
            alert("Diagnosis deleted Successfuly");
          }

          if (response.status === 1) {
            this.errormsg = response.error;
            this.loader_eqp = false;
            console.log('error=', this.errormsg);
            alert('Error in Service! Refresh the page')
            //this._loginserviceService.logout();
          }
        },
        (error) => { }
      );
    
  }
  //get all diagnostic list
}
