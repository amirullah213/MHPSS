import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ncri-discharged-patient',
  templateUrl: './discharged-patient.component.html',
  styleUrls: ['./discharged-patient.component.scss']
})
export class DischargedPatientComponent implements OnInit {

  printPage() {
    window.print();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
