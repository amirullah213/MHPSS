import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { AfterViewInit,  ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminServiceService } from '../services/admin-service.service';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'ncri-signs',
  templateUrl: './signs.component.html',
  styleUrls: ['./signs.component.scss']
})
export class SignsComponent implements OnInit {
  model: any = {};
  modalRef: BsModalRef;
  errormsg: string;

  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
  }
   openModAdd(SignsAdd: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(SignsAdd); //, this.userData  //, data
    // this.modalRef.content.userActivate = 'Close';
  }
  openModedit(SignsEdit: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(SignsEdit); //, this.userData  //, data
    // this.modalRef.content.userActivate = 'Close';
  }
  openModdelete(Signsdelete: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(Signsdelete); //, this.userData  //, data
    // this.modalRef.content.userActivate = 'Close';
  }

}
