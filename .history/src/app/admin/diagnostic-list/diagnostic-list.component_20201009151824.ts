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
  selected: string;
  userOb: any = {};
  EuserOb:any={};
  dtOptions: any = {};
  model: any = {};
  model2: any = {};
  modalRef: BsModalRef;
  model5: any = {};
  allDiag: any = [];
  loader_eqp: boolean = false;
  errormsg: string;
  userData:any={};
  userID:number;
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  //dtTrigger: Subject = new Subject();
  dtTrigger: Subject<any> = new Subject();


  constructor(
    private modalService: BsModalService,
    private adminService: AdminServiceService
  ) { }

  ngOnInit() {
    
    // this.getAllDiagnostics();
  }
  openModAdd(diagnosticAdd: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(diagnosticAdd); //, this.userData  //, data
    // this.modalRef.content.userActivate = 'Close';
  }
  openModedit(diagnosticEdit: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(diagnosticEdit); //, this.userData  //, data
    // this.modalRef.content.userActivate = 'Close';
  }
  openModdelete(diagnosticdelete: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(diagnosticdelete); //, this.userData  //, data
    // this.modalRef.content.userActivate = 'Close';
  }
  rerender(): void {
    try {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    } catch (err) {
      console.log(err);
    }
  }
  //get all diagnostic list
  getAllDiagnostics() {
    this.loader_eqp = true;
    
    this.model5.search=this.selected;
   this.adminService.searchDiagnosis(this.model5).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.allDiag = response.data;
        // console.log('all diagnostic list==', this.allDiag);
          // this.rerender();
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            dom: 'lBfrtip',
            buttons: ['print', 'excel'],
          };
          this.dtTrigger.next();
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
  //get all diagnostic list

}
