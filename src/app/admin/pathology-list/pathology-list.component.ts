import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ncri-pathology-list',
  templateUrl: './pathology-list.component.html',
  styleUrls: ['./pathology-list.component.scss']
})
export class PathologyListComponent implements OnInit {
  model: any = {};
  modalRef: BsModalRef;
  errormsg: string;

  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
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

}
