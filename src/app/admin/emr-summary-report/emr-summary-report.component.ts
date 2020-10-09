import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse'; 


@Component({
  selector: 'ncri-emr-summary-report',
  templateUrl: './emr-summary-report.component.html',
  styleUrls: ['./emr-summary-report.component.scss']
})
export class EmrSummaryReportComponent implements OnInit {

  isCollapsed = true;

  currentDate = new Date();
  form = new FormGroup({
    dateYMD: new FormControl(new Date()),
    dateFull: new FormControl(new Date()),
    dateMDY: new FormControl(new Date()),
    dateRange: new FormControl([
      new Date(),
      new Date(this.currentDate.setDate(this.currentDate.getDate() + 7))
    ])
  });

  model: any = {};
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private fb: FormBuilder) {

  }

  ngOnInit(): void { }

  openModAdd(captureuser: TemplateRef<any>) {
    this.modalRef = this.modalService.show(captureuser);
  }

  //--------------------------------
}

