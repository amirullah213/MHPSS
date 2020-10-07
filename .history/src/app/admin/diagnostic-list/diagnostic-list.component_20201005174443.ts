import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ncri-diagnostic-list',
  templateUrl: './diagnostic-list.component.html',
  styleUrls: ['./diagnostic-list.component.scss']
})
export class DiagnosticListComponent implements OnInit {
  model: any = {};
  modalRef: BsModalRef;
  errormsg: string;

  constructor(
    private modalService: BsModalService,
    // public router: Router,
    // public _AllequipService:AllequipService,
    // public _loginserviceService:LoginserviceService,
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
