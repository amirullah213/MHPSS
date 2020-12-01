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
  ambID:any;

  dtTrigger: Subject<any> = new Subject();



  constructor(
    private modalService: BsModalService,
    private adminService: AdminServiceService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      dom: 'lBfrtip',
     // buttons: ['print', 'excel'],
    };
    this.getAllDiagnostics();
  }
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
   // if (this.selected.length >= 3) {
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
   // }
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
            location.reload();
          }

          if (response.status === 1) {
            this.errormsg = response.error;
            this.loader_eqp = false;
            console.log('error=', this.errormsg);
            alert('Error in Service! Refresh the page' )
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

    this.model10.id = this.ambID.id;
    console.log('this.selected.length==', this.model10)
   
      this.adminService.deletDiagnosis(this.model10).subscribe(
        (response: any) => {
          if (response.status === 0) {
            
            this.modalRef.hide();
            this.showTable=false;
            this.loader_eqp = false;
            this.selectedData={};
            this.selected='';
            location.reload();
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
