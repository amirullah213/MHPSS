
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ncri-ambulance',
  templateUrl: './ambulance.component.html',
  styleUrls: ['./ambulance.component.scss']
})
export class AmbulanceComponent implements OnInit {
  model: any = {};
  modalRef: BsModalRef;
  errormsg: string;

  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
  }
  openModAdd(AmbAdd: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(AmbAdd);
    // this.modalRef.content.userActivate = 'Close';
  }
  openModedit(AmbEdit: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(AmbEdit);
    // this.modalRef.content.userActivate = 'Close';
  }
  openModdelete(Ambdelete: TemplateRef<any>) {
    // this.userData = data;
    this.modalRef = this.modalService.show(Ambdelete);
    // this.modalRef.content.userActivate = 'Close';
  }

}

