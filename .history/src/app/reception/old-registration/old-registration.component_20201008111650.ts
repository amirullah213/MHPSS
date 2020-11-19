import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ncri-old-registration',
  templateUrl: './old-registration.component.html',
  styleUrls: ['./old-registration.component.scss']
})
export class OldRegistrationComponent implements OnInit {
  model: any = {};
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  openModAdd(captureuser: TemplateRef<any>) {
    this.modalRef = this.modalService.show(captureuser);
  }
  openchildMod(childModal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(childModal);
  }

}
