import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ncri-radiology-list',
  templateUrl: './radiology-list.component.html',
  styleUrls: ['./radiology-list.component.scss']
})
export class RadiologyListComponent implements OnInit {
  model: any = {};
  modalRef: BsModalRef;
  errormsg: string;

  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
  }
  openModAdd(radiologyAdd: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(radiologyAdd);
    // this.modalRef.content.userActivate = 'Close';
  }
  openModedit(radiologyEdit: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(radiologyEdit);
    // this.modalRef.content.userActivate = 'Close';
  }
  openModdelete(radiologydelete: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(radiologydelete);
    // this.modalRef.content.userActivate = 'Close';
  }

}
