import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminServiceService } from '../services/admin-service.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'ncri-pharmcy',
  templateUrl: './pharmcy.component.html',
  styleUrls: ['./pharmcy.component.scss']
})
export class PharmcyComponent implements OnInit {
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
  openModAdd(pharmaAdd: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(pharmaAdd);
    // this.modalRef.content.userActivate = 'Close';
  }
  openModedit(pharmaEdit: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(pharmaEdit);
    // this.modalRef.content.userActivate = 'Close';
  }
  openModdelete(pharmadelete: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(pharmadelete);
    // this.modalRef.content.userActivate = 'Close';
  }

}
