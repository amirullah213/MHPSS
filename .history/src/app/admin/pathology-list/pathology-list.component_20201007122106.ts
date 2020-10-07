import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminServiceService } from '../services/admin-service.service';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'ncri-pathology-list',
  templateUrl: './pathology-list.component.html',
  styleUrls: ['./pathology-list.component.scss']
})
export class PathologyListComponent implements OnInit {
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

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      dom: 'lBfrtip',
      buttons: ['print', 'excel'],
    };
    this.getUserList();
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
  openModAdd(pathologyAdd: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(pathologyAdd);
    // this.modalRef.content.userActivate = 'Close';
  }
  openModedit(pathologyEdit: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(pathologyEdit);
    // this.modalRef.content.userActivate = 'Close';
  }
  openModdelete(pathologydelete: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(pathologydelete);
    // this.modalRef.content.userActivate = 'Close';
  }

   //get all pathology List
   getUserList() {
    this.loader_eqp = true;

    this.adminService.getPatList(this.model).subscribe(
      (response: any) => {
        if (response.status === 0) {
          this.allUsers = response.data;
          console.log('allHospitals==', this.allUsers);
          this.rerender();
          this.loader_eqp = false;
        }
       if (response.status === 1) {
          this.errormsg = response.errors;
          this.loader_eqp = false;
          console.log('error=', this.errormsg);
         
        }
      },
      (error) => {}
    );
  }
//get all pathology List
}
