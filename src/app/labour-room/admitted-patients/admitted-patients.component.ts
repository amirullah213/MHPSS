import { Component, OnInit } from '@angular/core';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'ncri-admitted-patients',
  templateUrl: './admitted-patients.component.html',
  styleUrls: ['./admitted-patients.component.scss']
})
export class AdmittedPatientsComponent implements OnInit {

  mytime: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
