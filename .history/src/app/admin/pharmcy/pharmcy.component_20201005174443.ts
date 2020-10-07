import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ncri-pharmcy',
  templateUrl: './pharmcy.component.html',
  styleUrls: ['./pharmcy.component.scss']
})
export class PharmcyComponent implements OnInit {
  model: any = {};
  modalRef: BsModalRef;
  errormsg: string;

  constructor(
    private modalService: BsModalService,
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
