import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ncri-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {
  model: any = {};
  modalRef: BsModalRef;
  errormsg: string;

  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
  }  
   openModAdd(ComplaintsAdd: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(ComplaintsAdd); //, this.userData  //, data
    // this.modalRef.content.userActivate = 'Close';
  }
  openModedit(ComplaintsEdit: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(ComplaintsEdit); //, this.userData  //, data
    // this.modalRef.content.userActivate = 'Close';
  }
  openModdelete(Complaintsdelete: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(Complaintsdelete); //, this.userData  //, data
    // this.modalRef.content.userActivate = 'Close';
  }

}
