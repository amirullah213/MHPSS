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
  
  userOb: any = {};
  EuserOb:any={};
  dtOptions: any = {};
  model: any = {};
  model2: any = {};
  modalRef: BsModalRef;
 
  allUsers: any = [];
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

  ngOnInit(): void {
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

}
